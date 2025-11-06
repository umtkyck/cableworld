# Fast Quoting System Architecture

## Overview
Instant quote generation (<60 seconds) for cable and wire harness assemblies with real-time pricing, lead time calculation, and manufacturing partner matching.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  BOM Input │→ │ Quote Form │→ │ Live Quote │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API / WebSocket
┌────────────────────────▼────────────────────────────────────┐
│                    API Gateway (Rate Limiting)               │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  Quote Engine Service                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  1. Component Pricing Service                        │   │
│  │  2. Labor Cost Calculator                            │   │
│  │  3. Manufacturing Partner Matcher                    │   │
│  │  4. Lead Time Estimator                              │   │
│  │  5. Shipping Cost Calculator                         │   │
│  │  6. Margin & Discount Engine                         │   │
│  └──────────────────────────────────────────────────────┘   │
└────┬────────────┬────────────┬────────────┬────────────────┘
     │            │            │            │
     ▼            ▼            ▼            ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────────┐
│Component│ │  Redis  │ │Manufact-│ │  Shipping    │
│Database │ │ Cache   │ │urer DB  │ │  API         │
└─────────┘ └─────────┘ └─────────┘ └──────────────┘
     │
     ▼
┌──────────────────────────────────────┐
│  External APIs (Digikey, Mouser...)  │
└──────────────────────────────────────┘
```

---

## Quote Calculation Formula

### Total Quote Price
```
Total Price = Component Costs + Labor Costs + Overhead + Margin + Shipping
```

### Component Breakdown

#### 1. Component Costs
```python
def calculate_component_costs(bom: List[Component], quantity: int) -> float:
    """
    Calculate total component costs with volume discounts
    """
    total = 0

    for component in bom:
        # Get real-time pricing from suppliers
        pricing = get_component_pricing(
            part_number=component.part_number,
            quantity=quantity * component.quantity_per_unit
        )

        # Apply volume breaks
        unit_price = apply_volume_pricing(pricing, quantity)

        # Add buffer for price fluctuation (2-5%)
        buffered_price = unit_price * 1.03

        total += buffered_price * component.quantity_per_unit * quantity

    return total


def get_component_pricing(part_number: str, quantity: int) -> PricingData:
    """
    Get pricing from multiple suppliers, return best price
    """
    # Check cache first (30-minute TTL)
    cached = redis.get(f"price:{part_number}:{quantity}")
    if cached:
        return json.loads(cached)

    # Query all supplier APIs in parallel
    prices = await asyncio.gather(
        digikey_api.get_pricing(part_number, quantity),
        mouser_api.get_pricing(part_number, quantity),
        newark_api.get_pricing(part_number, quantity),
        lcsc_api.get_pricing(part_number, quantity),
        return_exceptions=True
    )

    # Filter out errors and get best price
    valid_prices = [p for p in prices if not isinstance(p, Exception)]

    if not valid_prices:
        raise ComponentNotAvailable(part_number)

    best_price = min(valid_prices, key=lambda p: p.unit_price)

    # Cache result
    redis.setex(f"price:{part_number}:{quantity}", 1800, json.dumps(best_price))

    return best_price
```

#### 2. Labor Costs
```python
class LaborCostCalculator:
    """
    Calculate labor costs based on harness complexity
    """

    # Base rates (per unit)
    BASE_RATES = {
        "wire_cutting": 0.50,      # per cut
        "wire_stripping": 0.30,    # per strip
        "crimping": 0.75,          # per crimp
        "soldering": 2.00,         # per solder joint
        "connector_assembly": 1.50, # per connector
        "heat_shrink": 0.40,       # per heat shrink
        "labeling": 0.60,          # per label
        "testing": 3.00,           # per unit
        "packaging": 1.50,         # per unit
    }

    def calculate(self, harness: HarnessSpec, quantity: int) -> LaborCost:
        """
        Calculate total labor cost
        """
        operations = self.analyze_operations(harness)

        # Calculate base labor
        base_labor = sum(
            self.BASE_RATES[op.type] * op.count
            for op in operations
        )

        # Complexity multiplier (1.0 - 2.5x)
        complexity = self.calculate_complexity(harness)

        # Volume discount (economies of scale)
        volume_factor = self.get_volume_factor(quantity)

        # Quality level multiplier
        quality_multiplier = {
            "standard": 1.0,
            "professional": 1.3,
            "aerospace": 2.0
        }[harness.quality_level]

        total_labor = (
            base_labor *
            complexity *
            volume_factor *
            quality_multiplier *
            quantity
        )

        return LaborCost(
            base=base_labor,
            complexity_factor=complexity,
            volume_factor=volume_factor,
            quality_multiplier=quality_multiplier,
            total=total_labor,
            operations=operations
        )

    def calculate_complexity(self, harness: HarnessSpec) -> float:
        """
        Calculate complexity score (1.0 = simple, 2.5 = very complex)
        """
        score = 1.0

        # Connector count
        if harness.connector_count > 10:
            score += 0.3
        elif harness.connector_count > 20:
            score += 0.6

        # Wire count
        if harness.wire_count > 20:
            score += 0.2
        elif harness.wire_count > 50:
            score += 0.5

        # Pin count
        if harness.total_pins > 100:
            score += 0.3

        # Multiple wire gauges
        if len(harness.wire_gauges) > 3:
            score += 0.2

        # Branching
        if harness.branches > 3:
            score += 0.4

        # Overmolding
        if harness.has_overmolding:
            score += 0.5

        # Custom shielding
        if harness.has_shielding:
            score += 0.3

        return min(score, 2.5)  # Cap at 2.5x

    def get_volume_factor(self, quantity: int) -> float:
        """
        Volume discount on labor (economies of scale)
        """
        if quantity < 10:
            return 1.0
        elif quantity < 50:
            return 0.85
        elif quantity < 100:
            return 0.75
        elif quantity < 500:
            return 0.65
        elif quantity < 1000:
            return 0.55
        else:
            return 0.50  # 50% labor discount at high volume
```

#### 3. Manufacturing Partner Matching
```python
class ManufacturerMatcher:
    """
    Match quote request to best manufacturing partner
    """

    async def find_best_match(
        self,
        harness: HarnessSpec,
        quantity: int,
        lead_time: int,
        location: str
    ) -> List[ManufacturerQuote]:
        """
        Find and score manufacturing partners
        """
        # Get all eligible manufacturers
        manufacturers = await self.get_eligible_manufacturers(
            capabilities=harness.required_capabilities,
            certifications=harness.required_certifications,
            min_quantity=quantity,
            location_preference=location
        )

        # Score each manufacturer
        scored = []
        for mfg in manufacturers:
            score = self.score_manufacturer(
                manufacturer=mfg,
                harness=harness,
                quantity=quantity,
                lead_time=lead_time
            )

            # Get manufacturer's estimated cost
            cost = await self.estimate_manufacturer_cost(mfg, harness, quantity)

            scored.append({
                "manufacturer": mfg,
                "score": score,
                "cost": cost,
                "lead_time": self.estimate_lead_time(mfg, quantity)
            })

        # Sort by score (descending)
        scored.sort(key=lambda x: x["score"], reverse=True)

        return scored[:3]  # Return top 3

    def score_manufacturer(
        self,
        manufacturer: Manufacturer,
        harness: HarnessSpec,
        quantity: int,
        lead_time: int
    ) -> float:
        """
        Score manufacturer fit (0-100)
        """
        score = 0

        # Past performance (40 points max)
        if manufacturer.total_orders > 0:
            quality_score = manufacturer.quality_rating * 20  # 0-20
            delivery_score = manufacturer.on_time_delivery * 20  # 0-20
            score += quality_score + delivery_score

        # Capability match (30 points max)
        capability_match = len(
            set(harness.required_capabilities) &
            set(manufacturer.capabilities)
        ) / len(harness.required_capabilities)
        score += capability_match * 30

        # Lead time (15 points max)
        estimated_lead = self.estimate_lead_time(manufacturer, quantity)
        if estimated_lead <= lead_time:
            score += 15
        elif estimated_lead <= lead_time * 1.5:
            score += 10
        elif estimated_lead <= lead_time * 2:
            score += 5

        # Cost competitiveness (15 points max)
        if manufacturer.avg_cost_percentile <= 25:  # Bottom 25% (cheap)
            score += 15
        elif manufacturer.avg_cost_percentile <= 50:
            score += 10
        elif manufacturer.avg_cost_percentile <= 75:
            score += 5

        return score
```

#### 4. Lead Time Calculation
```python
class LeadTimeEstimator:
    """
    Estimate production and delivery lead times
    """

    def estimate(
        self,
        harness: HarnessSpec,
        quantity: int,
        manufacturer: Manufacturer,
        express: bool = False
    ) -> LeadTimeEstimate:
        """
        Calculate total lead time
        """
        # Component procurement time
        component_lead = self.estimate_component_lead_time(harness)

        # Production time
        production_lead = self.estimate_production_time(
            harness,
            quantity,
            manufacturer
        )

        # Testing time
        testing_lead = self.estimate_testing_time(harness, quantity)

        # Shipping time
        shipping_lead = self.estimate_shipping_time(
            manufacturer.location,
            harness.destination
        )

        # Apply express modifiers
        if express:
            production_lead *= 0.5
            shipping_lead *= 0.5

        total_days = (
            component_lead +
            production_lead +
            testing_lead +
            shipping_lead
        )

        return LeadTimeEstimate(
            component_procurement=component_lead,
            production=production_lead,
            testing=testing_lead,
            shipping=shipping_lead,
            total_business_days=total_days,
            estimated_delivery_date=self.calculate_delivery_date(total_days)
        )

    def estimate_production_time(
        self,
        harness: HarnessSpec,
        quantity: int,
        manufacturer: Manufacturer
    ) -> int:
        """
        Estimate production time in business days
        """
        # Base time per unit (hours)
        base_time = self.calculate_unit_build_time(harness)

        # Total build time
        total_hours = base_time * quantity

        # Apply manufacturer efficiency
        total_hours *= manufacturer.efficiency_factor

        # Convert to days (8-hour workday)
        days = math.ceil(total_hours / 8)

        # Minimum 2 days for setup
        return max(days, 2)

    def calculate_unit_build_time(self, harness: HarnessSpec) -> float:
        """
        Calculate time to build one unit (hours)
        """
        time = 0

        # Wire prep
        time += harness.wire_count * 0.05  # 3 min per wire

        # Crimping
        time += harness.terminal_count * 0.03  # 2 min per crimp

        # Connector assembly
        time += harness.connector_count * 0.15  # 9 min per connector

        # Soldering (if applicable)
        time += harness.solder_joints * 0.08  # 5 min per joint

        # Assembly
        time += 0.5  # 30 min base assembly

        # Testing
        time += 0.25  # 15 min testing

        # Quality checks
        time += 0.15  # 9 min QC

        return time
```

#### 5. Shipping Cost Calculation
```python
class ShippingCalculator:
    """
    Calculate shipping costs using carrier APIs
    """

    def __init__(self):
        self.fedex = FedExAPI()
        self.ups = UPSAPI()
        self.dhl = DHLAPI()

    async def calculate(
        self,
        origin: Address,
        destination: Address,
        weight: float,
        dimensions: Dimensions,
        service_level: str
    ) -> ShippingQuote:
        """
        Get shipping quotes from multiple carriers
        """
        # Estimate package specs
        package = self.estimate_package(weight, dimensions)

        # Get quotes in parallel
        quotes = await asyncio.gather(
            self.fedex.get_quote(origin, destination, package, service_level),
            self.ups.get_quote(origin, destination, package, service_level),
            self.dhl.get_quote(origin, destination, package, service_level),
            return_exceptions=True
        )

        valid_quotes = [q for q in quotes if not isinstance(q, Exception)]

        if not valid_quotes:
            # Fallback to estimated rates
            return self.estimate_shipping_cost(origin, destination, package)

        # Return cheapest option
        best = min(valid_quotes, key=lambda q: q.cost)

        return ShippingQuote(
            carrier=best.carrier,
            service=best.service,
            cost=best.cost,
            transit_days=best.transit_days,
            alternatives=[q for q in valid_quotes if q != best]
        )
```

#### 6. Margin & Discount Engine
```python
class PricingEngine:
    """
    Apply margins, discounts, and pricing rules
    """

    # Target margins by complexity
    TARGET_MARGINS = {
        "simple": 0.35,      # 35% margin
        "moderate": 0.30,    # 30% margin
        "complex": 0.25,     # 25% margin
        "very_complex": 0.20 # 20% margin
    }

    def calculate_final_price(
        self,
        component_cost: float,
        labor_cost: float,
        shipping_cost: float,
        harness: HarnessSpec,
        quantity: int,
        customer: Customer = None
    ) -> PriceBreakdown:
        """
        Calculate final customer price with margins and discounts
        """
        # Total cost basis
        total_cost = component_cost + labor_cost + shipping_cost

        # Determine complexity tier
        complexity = self.get_complexity_tier(harness)

        # Base margin
        target_margin = self.TARGET_MARGINS[complexity]

        # Calculate base price
        base_price = total_cost / (1 - target_margin)

        # Apply volume discounts
        volume_discount = self.calculate_volume_discount(quantity)
        price_after_volume = base_price * (1 - volume_discount)

        # Apply customer discounts
        customer_discount = 0
        if customer:
            customer_discount = self.calculate_customer_discount(customer)

        final_price = price_after_volume * (1 - customer_discount)

        # Ensure minimum margin (15%)
        min_price = total_cost * 1.15
        final_price = max(final_price, min_price)

        return PriceBreakdown(
            component_cost=component_cost,
            labor_cost=labor_cost,
            shipping_cost=shipping_cost,
            subtotal=total_cost,
            margin_percent=((final_price - total_cost) / final_price) * 100,
            volume_discount_percent=volume_discount * 100,
            customer_discount_percent=customer_discount * 100,
            final_price=final_price,
            unit_price=final_price / quantity
        )

    def calculate_volume_discount(self, quantity: int) -> float:
        """
        Volume discounts (% off)
        """
        if quantity >= 1000:
            return 0.15    # 15% off
        elif quantity >= 500:
            return 0.12    # 12% off
        elif quantity >= 250:
            return 0.10    # 10% off
        elif quantity >= 100:
            return 0.07    # 7% off
        elif quantity >= 50:
            return 0.05    # 5% off
        else:
            return 0.0

    def calculate_customer_discount(self, customer: Customer) -> float:
        """
        Customer loyalty/enterprise discounts
        """
        discount = 0

        # Repeat customer discount
        if customer.order_count > 10:
            discount += 0.05
        elif customer.order_count > 5:
            discount += 0.03

        # High lifetime value discount
        if customer.lifetime_value > 100000:
            discount += 0.10
        elif customer.lifetime_value > 50000:
            discount += 0.05

        # Enterprise contract
        if customer.has_enterprise_agreement:
            discount += customer.contract_discount

        return min(discount, 0.25)  # Max 25% total customer discount
```

---

## Quote Response Format

```json
{
  "quote_id": "QT-2024-001234",
  "status": "ready",
  "created_at": "2024-11-06T10:30:00Z",
  "expires_at": "2024-11-20T10:30:00Z",
  "harness": {
    "name": "Control Panel Harness",
    "complexity": "moderate",
    "connector_count": 8,
    "wire_count": 24,
    "total_length_meters": 3.5
  },
  "quantity": 100,
  "pricing": {
    "component_cost": 1250.00,
    "labor_cost": 875.00,
    "shipping_cost": 125.00,
    "subtotal": 2250.00,
    "volume_discount": -112.50,
    "customer_discount": 0.00,
    "total": 2137.50,
    "unit_price": 21.38,
    "margin_percent": 28.5
  },
  "lead_time": {
    "component_procurement_days": 3,
    "production_days": 7,
    "testing_days": 1,
    "shipping_days": 2,
    "total_business_days": 13,
    "estimated_delivery": "2024-11-25"
  },
  "manufacturer": {
    "name": "PrecisionWire Manufacturing",
    "location": "Shenzhen, China",
    "quality_rating": 4.8,
    "on_time_delivery": 0.96
  },
  "options": {
    "express_production": {
      "available": true,
      "lead_time_days": 7,
      "additional_cost": 427.50,
      "total": 2565.00
    },
    "rush_production": {
      "available": true,
      "lead_time_days": 3,
      "additional_cost": 962.00,
      "total": 3099.50
    }
  },
  "volume_pricing": [
    {"quantity": 50, "unit_price": 23.50, "total": 1175.00},
    {"quantity": 100, "unit_price": 21.38, "total": 2137.50},
    {"quantity": 250, "unit_price": 19.20, "total": 4800.00},
    {"quantity": 500, "unit_price": 17.50, "total": 8750.00},
    {"quantity": 1000, "unit_price": 15.85, "total": 15850.00}
  ],
  "alternatives": [
    {
      "description": "Use pre-terminated wires",
      "savings": 175.00,
      "lead_time_change": -2,
      "note": "Reduces assembly time"
    }
  ]
}
```

---

## Performance Optimization

### Caching Strategy
```python
# Redis cache layers
CACHE_TTLS = {
    "component_pricing": 1800,      # 30 minutes
    "manufacturer_list": 3600,      # 1 hour
    "shipping_rates": 86400,        # 24 hours
    "customer_data": 300,           # 5 minutes
}

# Cache key patterns
def get_cache_key(type: str, **kwargs) -> str:
    """
    Generate cache key
    """
    if type == "component_price":
        return f"price:{kwargs['part_number']}:{kwargs['quantity']}"
    elif type == "quote":
        return f"quote:{kwargs['harness_hash']}:{kwargs['quantity']}"
    # ...
```

### Database Indexing
```sql
-- Component database indexes
CREATE INDEX idx_components_part_number ON components(part_number);
CREATE INDEX idx_components_manufacturer ON components(manufacturer);
CREATE INDEX idx_components_category ON components(category);
CREATE INDEX idx_components_search ON components USING gin(search_vector);

-- Manufacturer indexes
CREATE INDEX idx_manufacturers_capabilities ON manufacturers USING gin(capabilities);
CREATE INDEX idx_manufacturers_location ON manufacturers(country, city);
CREATE INDEX idx_manufacturers_rating ON manufacturers(quality_rating DESC);

-- Quote history indexes
CREATE INDEX idx_quotes_customer ON quotes(customer_id, created_at DESC);
CREATE INDEX idx_quotes_status ON quotes(status, created_at DESC);
```

### API Rate Limiting
```python
# Rate limits by supplier
RATE_LIMITS = {
    "digikey": {"requests_per_minute": 60},
    "mouser": {"requests_per_minute": 100},
    "newark": {"requests_per_minute": 30},
}

# Implement token bucket algorithm
class RateLimiter:
    def __init__(self, supplier: str):
        self.limit = RATE_LIMITS[supplier]["requests_per_minute"]
        self.key = f"ratelimit:{supplier}"

    async def acquire(self):
        """
        Acquire rate limit token
        """
        tokens = await redis.get(self.key) or self.limit

        if tokens > 0:
            await redis.decr(self.key)
            await redis.expire(self.key, 60)
            return True
        else:
            raise RateLimitExceeded(f"Rate limit exceeded for {supplier}")
```

---

## Real-time Quote Updates

### WebSocket Implementation
```javascript
// Frontend: Live quote updates
const useLiveQuote = (quoteRequest) => {
  const [quote, setQuote] = useState(null);
  const [status, setStatus] = useState('calculating');

  useEffect(() => {
    const ws = new WebSocket('wss://api.loombotic.com/quotes/live');

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'start_quote',
        data: quoteRequest
      }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'component_pricing':
          setStatus('Pricing components...');
          break;
        case 'labor_calculation':
          setStatus('Calculating labor costs...');
          break;
        case 'manufacturer_matching':
          setStatus('Finding best manufacturer...');
          break;
        case 'quote_ready':
          setQuote(message.data);
          setStatus('complete');
          break;
      }
    };

    return () => ws.close();
  }, [quoteRequest]);

  return { quote, status };
};
```

---

## Quote Accuracy & Monitoring

### Key Metrics
- **Quote Accuracy**: % of quotes within 5% of final invoice
- **Quote Speed**: Time from request to quote generation
- **Conversion Rate**: % of quotes that become orders
- **Margin Variance**: Difference between target and actual margin

### Continuous Improvement
```python
class QuoteAccuracyTracker:
    """
    Track quote accuracy and adjust algorithms
    """

    async def record_actual_cost(
        self,
        quote_id: str,
        actual_component_cost: float,
        actual_labor_cost: float,
        actual_shipping_cost: float
    ):
        """
        Record actual costs vs. quoted costs
        """
        quote = await self.get_quote(quote_id)

        variance = {
            "component": (actual_component_cost - quote.component_cost) / quote.component_cost,
            "labor": (actual_labor_cost - quote.labor_cost) / quote.labor_cost,
            "shipping": (actual_shipping_cost - quote.shipping_cost) / quote.shipping_cost
        }

        # Store for analysis
        await self.db.insert("quote_variance", {
            "quote_id": quote_id,
            "variance": variance,
            "timestamp": datetime.now()
        })

        # Trigger retraining if variance > threshold
        if abs(variance["labor"]) > 0.15:  # 15% variance
            await self.trigger_model_retraining("labor_cost")
```

---

## A/B Testing Framework

```python
# Test different pricing strategies
PRICING_EXPERIMENTS = {
    "exp_margin_strategy_v2": {
        "enabled": True,
        "traffic_percent": 50,
        "variant": "dynamic_margin"  # vs. control: "fixed_margin"
    }
}

def get_pricing_strategy(customer_id: str) -> str:
    """
    Assign customer to experiment variant
    """
    exp = PRICING_EXPERIMENTS["exp_margin_strategy_v2"]

    if not exp["enabled"]:
        return "control"

    # Consistent hashing for assignment
    hash_val = int(hashlib.md5(customer_id.encode()).hexdigest(), 16)
    bucket = hash_val % 100

    if bucket < exp["traffic_percent"]:
        return exp["variant"]
    else:
        return "control"
```

---

## Quote PDF Generation

```python
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_quote_pdf(quote: Quote) -> bytes:
    """
    Generate professional quote PDF
    """
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)

    # Header
    pdf.setFont("Helvetica-Bold", 24)
    pdf.drawString(50, 750, "Loombotic")
    pdf.setFont("Helvetica", 12)
    pdf.drawString(50, 730, f"Quote #{quote.id}")

    # Quote details
    y = 680
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Quote Summary")
    y -= 30

    pdf.setFont("Helvetica", 11)
    pdf.drawString(50, y, f"Harness: {quote.harness_name}")
    y -= 20
    pdf.drawString(50, y, f"Quantity: {quote.quantity} units")
    y -= 20
    pdf.drawString(50, y, f"Unit Price: ${quote.unit_price:.2f}")
    y -= 20
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, f"Total: ${quote.total:.2f}")

    # ... (add more details)

    pdf.save()
    return buffer.getvalue()
```

---

## Summary

The fast quoting system delivers instant, accurate quotes through:

1. **Real-time component pricing** from multiple supplier APIs
2. **Intelligent labor cost modeling** based on harness complexity
3. **Smart manufacturer matching** considering quality, cost, and lead time
4. **Dynamic pricing** with volume discounts and customer incentives
5. **Comprehensive lead time calculation** across the entire supply chain
6. **Live updates** via WebSocket for real-time user feedback

**Performance Targets**:
- Quote generation: < 60 seconds
- API response time: < 200ms
- 99.9% uptime
- 95%+ quote accuracy (within 5% of final invoice)
