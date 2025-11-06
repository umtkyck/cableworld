# API Integrations - Manufacturers & Marketplaces

## Overview
Comprehensive API integrations with component suppliers, connector manufacturers, cable/wire vendors, and electronic marketplaces for real-time pricing, inventory, and specifications.

---

## Electronic Component Marketplaces

### 1. Digikey API

**API Documentation**: https://developer.digikey.com/

**Capabilities**:
- Product search (keyword, part number, manufacturer)
- Real-time pricing with volume breaks
- Inventory availability
- Datasheet access
- Technical specifications
- Alternative/substitute parts
- Parametric search

**API Endpoints**:
```python
class DigikeyAPI:
    BASE_URL = "https://api.digikey.com"

    def __init__(self, client_id: str, client_secret: str):
        self.client_id = client_id
        self.client_secret = client_secret
        self.access_token = None

    async def authenticate(self):
        """
        OAuth2 authentication
        """
        response = await httpx.post(
            f"{self.BASE_URL}/v1/oauth2/token",
            data={
                "client_id": self.client_id,
                "client_secret": self.client_secret,
                "grant_type": "client_credentials"
            }
        )
        self.access_token = response.json()["access_token"]

    async def search_product(self, keyword: str, filters: dict = None):
        """
        Search for products
        """
        response = await httpx.post(
            f"{self.BASE_URL}/Search/v3/Products/Keyword",
            headers={"Authorization": f"Bearer {self.access_token}"},
            json={
                "Keywords": keyword,
                "RecordCount": 50,
                "RecordStartPosition": 0,
                "Filters": filters or {}
            }
        )
        return response.json()

    async def get_product_details(self, part_number: str):
        """
        Get detailed product information
        """
        response = await httpx.get(
            f"{self.BASE_URL}/Search/v3/Products/{part_number}",
            headers={"Authorization": f"Bearer {self.access_token}"}
        )
        return response.json()

    async def get_pricing(self, part_number: str, quantity: int):
        """
        Get pricing for specific quantity
        """
        product = await self.get_product_details(part_number)

        # Find price break for quantity
        price_breaks = product.get("StandardPricing", [])
        applicable_price = None

        for price_break in sorted(price_breaks, key=lambda x: x["BreakQuantity"]):
            if quantity >= price_break["BreakQuantity"]:
                applicable_price = price_break["UnitPrice"]

        return {
            "supplier": "digikey",
            "part_number": part_number,
            "quantity": quantity,
            "unit_price": applicable_price,
            "extended_price": applicable_price * quantity if applicable_price else None,
            "currency": "USD",
            "in_stock": product.get("QuantityAvailable", 0),
            "lead_time_days": product.get("ManufacturerLeadWeeks", 0) * 7,
            "minimum_order_quantity": product.get("MinimumOrderQuantity", 1)
        }

    async def get_alternates(self, part_number: str):
        """
        Get alternative/substitute parts
        """
        # Use parametric search to find similar parts
        product = await self.get_product_details(part_number)

        response = await httpx.post(
            f"{self.BASE_URL}/Search/v3/Products/Keyword",
            headers={"Authorization": f"Bearer {self.access_token}"},
            json={
                "Keywords": product["ManufacturerPartNumber"],
                "RecordCount": 10,
                "SearchOptions": ["AlternatePackaging", "Substitutes"]
            }
        )

        return response.json()["Products"]
```

**Rate Limits**: 1000 requests/hour
**Pricing**: Free tier available, enterprise plans for high volume
**Data Update Frequency**: Real-time

---

### 2. Mouser API

**API Documentation**: https://www.mouser.com/api-hub/

**Capabilities**:
- Part search
- Pricing and availability
- Order placement
- Inventory tracking
- Cross-reference lookup

**API Endpoints**:
```python
class MouserAPI:
    BASE_URL = "https://api.mouser.com/api/v1"

    def __init__(self, api_key: str):
        self.api_key = api_key

    async def search_by_part_number(self, part_number: str):
        """
        Search by manufacturer part number
        """
        response = await httpx.get(
            f"{self.BASE_URL}/search/partnumber",
            params={
                "apiKey": self.api_key,
                "partnumber": part_number
            }
        )
        return response.json()

    async def search_by_keyword(self, keyword: str):
        """
        Keyword search
        """
        response = await httpx.get(
            f"{self.BASE_URL}/search/keyword",
            params={
                "apiKey": self.api_key,
                "keyword": keyword,
                "records": 50
            }
        )
        return response.json()

    async def get_pricing(self, part_number: str, quantity: int):
        """
        Get pricing information
        """
        result = await self.search_by_part_number(part_number)

        if not result.get("SearchResults", {}).get("Parts"):
            return None

        part = result["SearchResults"]["Parts"][0]

        # Find applicable price break
        price_breaks = part.get("PriceBreaks", [])
        applicable_price = None

        for pb in sorted(price_breaks, key=lambda x: x["Quantity"]):
            if quantity >= pb["Quantity"]:
                applicable_price = float(pb["Price"].replace("$", "").replace(",", ""))

        return {
            "supplier": "mouser",
            "part_number": part_number,
            "mouser_part_number": part.get("MouserPartNumber"),
            "quantity": quantity,
            "unit_price": applicable_price,
            "extended_price": applicable_price * quantity if applicable_price else None,
            "currency": part.get("PriceBreaks", [{}])[0].get("Currency", "USD"),
            "in_stock": int(part.get("AvailabilityInStock", 0)),
            "lead_time_days": part.get("LeadTime", "Unknown"),
            "datasheet_url": part.get("DataSheetUrl")
        }

    async def get_product_attributes(self, mouser_part_number: str):
        """
        Get detailed product attributes
        """
        response = await httpx.post(
            f"{self.BASE_URL}/search/partnumberandattribute",
            json={
                "SearchByPartRequest": {
                    "mouserPartNumber": mouser_part_number,
                    "partSearchOptions": "string"
                }
            },
            params={"apiKey": self.api_key}
        )
        return response.json()
```

**Rate Limits**: 100,000 requests/day
**Pricing**: Free with API key
**Data Update Frequency**: Real-time

---

### 3. Newark/Farnell API

**API Documentation**: https://api.newark.com/

**Capabilities**:
- Product catalog access
- Pricing and stock levels
- Technical specifications
- Cross-reference search

**API Endpoints**:
```python
class NewarkAPI:
    BASE_URL = "https://api.newark.com/api/v1"

    def __init__(self, api_key: str):
        self.api_key = api_key

    async def keyword_search(self, keyword: str, limit: int = 50):
        """
        Search by keyword
        """
        response = await httpx.get(
            f"{self.BASE_URL}/products/search",
            params={
                "term": keyword,
                "storeInfo.id": "newark.com",
                "resultsSettings.numberOfResults": limit
            },
            headers={"x-api-key": self.api_key}
        )
        return response.json()

    async def get_product(self, sku: str):
        """
        Get product by SKU
        """
        response = await httpx.get(
            f"{self.BASE_URL}/products/{sku}",
            params={"storeInfo.id": "newark.com"},
            headers={"x-api-key": self.api_key}
        )
        return response.json()

    async def get_pricing(self, sku: str, quantity: int):
        """
        Get pricing for SKU
        """
        product = await self.get_product(sku)

        price_breaks = product.get("prices", [])
        applicable_price = None

        for pb in sorted(price_breaks, key=lambda x: x["from"]):
            if quantity >= pb["from"]:
                applicable_price = pb["cost"]

        return {
            "supplier": "newark",
            "sku": sku,
            "part_number": product.get("translatedManufacturerPartNumber"),
            "quantity": quantity,
            "unit_price": applicable_price,
            "extended_price": applicable_price * quantity if applicable_price else None,
            "currency": "USD",
            "in_stock": product.get("stock", {}).get("level", 0),
            "lead_time_days": product.get("stock", {}).get("leastLeadTime", 0)
        }
```

**Rate Limits**: 10,000 requests/day
**Pricing**: Free tier available
**Data Update Frequency**: Hourly

---

### 4. LCSC (Low-Cost Chinese Supplier)

**API Documentation**: https://wwwapi.lcsc.com/

**Capabilities**:
- Cost-effective Asian components
- High volume availability
- Fast shipping from China

**API Endpoints**:
```python
class LCSCAPI:
    BASE_URL = "https://api.lcsc.com/v1"

    def __init__(self, api_key: str):
        self.api_key = api_key

    async def search_products(self, keyword: str):
        """
        Search products by keyword
        """
        response = await httpx.post(
            f"{self.BASE_URL}/products/search",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={
                "keyword": keyword,
                "currentPage": 1,
                "pageSize": 50
            }
        )
        return response.json()

    async def get_product_detail(self, product_code: str):
        """
        Get detailed product information
        """
        response = await httpx.get(
            f"{self.BASE_URL}/products/detail/{product_code}",
            headers={"Authorization": f"Bearer {self.api_key}"}
        )
        return response.json()

    async def get_pricing(self, product_code: str, quantity: int):
        """
        Get pricing with quantity breaks
        """
        product = await self.get_product_detail(product_code)

        price_breaks = product.get("productPriceList", [])
        applicable_price = None

        for pb in sorted(price_breaks, key=lambda x: x["startQuantity"]):
            if quantity >= pb["startQuantity"]:
                applicable_price = pb["productPrice"]

        return {
            "supplier": "lcsc",
            "product_code": product_code,
            "part_number": product.get("productModel"),
            "quantity": quantity,
            "unit_price": applicable_price,
            "extended_price": applicable_price * quantity if applicable_price else None,
            "currency": "USD",
            "in_stock": product.get("stockNumber", 0),
            "lead_time_days": 7  # Typical shipping from China
        }
```

**Rate Limits**: 5,000 requests/day
**Pricing**: Free
**Data Update Frequency**: Daily

---

### 5. Arrow Electronics API

**API Documentation**: https://developers.arrow.com/

**Capabilities**:
- Enterprise component sourcing
- Global inventory
- Custom supply chain solutions

**API Endpoints**:
```python
class ArrowAPI:
    BASE_URL = "https://api.arrow.com/partservice/v2"

    def __init__(self, api_key: str, username: str):
        self.api_key = api_key
        self.username = username

    async def part_search(self, part_number: str):
        """
        Search for part
        """
        response = await httpx.get(
            f"{self.BASE_URL}/search",
            params={
                "apikey": self.api_key,
                "login": self.username,
                "part_num": part_number
            }
        )
        return response.json()

    async def get_pricing(self, part_number: str, quantity: int):
        """
        Get pricing information
        """
        result = await self.part_search(part_number)

        if not result.get("itemserviceresult"):
            return None

        item = result["itemserviceresult"][0]

        price_breaks = item.get("pricinginfo", {}).get("pricebreaks", [])
        applicable_price = None

        for pb in sorted(price_breaks, key=lambda x: x["quantity"]):
            if quantity >= pb["quantity"]:
                applicable_price = pb["price"]

        return {
            "supplier": "arrow",
            "part_number": part_number,
            "quantity": quantity,
            "unit_price": applicable_price,
            "extended_price": applicable_price * quantity if applicable_price else None,
            "in_stock": item.get("inv", {}).get("invavail", 0),
            "lead_time_days": item.get("leadtime", 0)
        }
```

---

## Connector Manufacturers

### 6. TE Connectivity API

**API Type**: REST API + Product catalog
**Documentation**: https://www.te.com/usa-en/products.html

**Integration Strategy**:
```python
class TEConnectivityAPI:
    """
    TE Connectivity integration
    Note: May require custom B2B integration agreement
    """

    BASE_URL = "https://api.te.com"

    async def search_connectors(
        self,
        pin_count: int = None,
        pitch: float = None,
        current_rating: float = None,
        voltage_rating: float = None,
        mounting_type: str = None
    ):
        """
        Parametric connector search
        """
        filters = {
            "category": "connectors",
            "pin_count": pin_count,
            "pitch_mm": pitch,
            "current_rating_A": current_rating,
            "voltage_rating_V": voltage_rating,
            "mounting_type": mounting_type
        }

        # Remove None values
        filters = {k: v for k, v in filters.items() if v is not None}

        response = await httpx.post(
            f"{self.BASE_URL}/products/search",
            json={"filters": filters}
        )
        return response.json()

    async def get_connector_specs(self, part_number: str):
        """
        Get detailed connector specifications
        """
        response = await httpx.get(
            f"{self.BASE_URL}/products/{part_number}"
        )

        product = response.json()

        return {
            "part_number": product["partNumber"],
            "series": product["series"],
            "pin_count": product["numberOfPositions"],
            "pitch": product["pitch"],
            "current_rating": product["currentRating"],
            "voltage_rating": product["voltageRating"],
            "mounting_type": product["mountingType"],
            "mating_cycles": product["matingCycles"],
            "operating_temp_range": product["operatingTemperature"],
            "datasheet_url": product["datasheetUrl"],
            "3d_model_url": product["cadModelUrl"]
        }
```

**Alternative**: Web scraping + manual catalog management for manufacturers without public APIs

---

### 7. Molex API

**Integration Approach**: Product catalog + Distributor APIs

```python
class MolexIntegration:
    """
    Molex products via distributor APIs
    """

    def __init__(self):
        self.digikey = DigikeyAPI()
        self.mouser = MouserAPI()

    async def search_molex_connectors(self, filters: dict):
        """
        Search Molex products across distributors
        """
        # Add manufacturer filter
        filters["manufacturer"] = "Molex"

        # Search in parallel
        results = await asyncio.gather(
            self.digikey.search_product("molex connector", filters),
            self.mouser.search_by_keyword("molex connector"),
            return_exceptions=True
        )

        # Combine and deduplicate results
        combined = []
        seen_parts = set()

        for result in results:
            if isinstance(result, Exception):
                continue

            for product in result.get("products", []):
                pn = product.get("manufacturerPartNumber")
                if pn and pn not in seen_parts:
                    combined.append(product)
                    seen_parts.add(pn)

        return combined
```

---

### 8. Amphenol, JST, Hirose Integration

**Strategy**: Similar approach via distributor APIs

```python
class ConnectorManufacturerIntegration:
    """
    Unified interface for connector manufacturers
    """

    MANUFACTURERS = {
        "te_connectivity": "TE Connectivity",
        "molex": "Molex",
        "amphenol": "Amphenol",
        "jst": "JST",
        "hirose": "Hirose",
        "phoenix_contact": "Phoenix Contact"
    }

    def __init__(self):
        self.distributors = [
            DigikeyAPI(),
            MouserAPI(),
            NewarkAPI()
        ]

    async def search_connector(
        self,
        manufacturer: str,
        pin_count: int = None,
        current_rating: float = None,
        **kwargs
    ):
        """
        Search for connectors from specific manufacturer
        """
        # Build search query
        query = f"{self.MANUFACTURERS[manufacturer]} connector"
        if pin_count:
            query += f" {pin_count} pin"

        # Search all distributors in parallel
        results = []
        for distributor in self.distributors:
            try:
                result = await distributor.search_product(query, kwargs)
                results.extend(result.get("products", []))
            except Exception as e:
                logger.error(f"Error searching {distributor.__class__.__name__}: {e}")

        return self.deduplicate_results(results)

    def deduplicate_results(self, results: List[dict]) -> List[dict]:
        """
        Remove duplicate parts from multiple distributors
        """
        seen = {}

        for result in results:
            pn = result.get("manufacturerPartNumber")
            if not pn:
                continue

            if pn not in seen:
                seen[pn] = result
            else:
                # Keep result with better pricing
                if result.get("unitPrice", float('inf')) < seen[pn].get("unitPrice", float('inf')):
                    seen[pn] = result

        return list(seen.values())
```

---

## Cable & Wire Manufacturers

### 9. Belden, Alpha Wire, General Cable Integration

**Strategy**: Catalog + Distributor APIs

```python
class CableManufacturerIntegration:
    """
    Integration for cable/wire manufacturers
    """

    MANUFACTURERS = {
        "belden": "Belden",
        "alpha_wire": "Alpha Wire",
        "general_cable": "General Cable",
        "lapp": "Lapp Group"
    }

    def __init__(self):
        self.distributors = [DigikeyAPI(), MouserAPI(), NewarkAPI()]

    async def search_wire(
        self,
        manufacturer: str,
        gauge: str,
        conductor_count: int = 1,
        insulation_type: str = None,
        voltage_rating: int = None,
        color: str = None
    ):
        """
        Search for wire/cable
        """
        query_parts = [
            self.MANUFACTURERS[manufacturer],
            f"{gauge}AWG",
            f"{conductor_count} conductor" if conductor_count > 1 else "wire"
        ]

        if color:
            query_parts.append(color)

        query = " ".join(query_parts)

        # Search distributors
        results = []
        for dist in self.distributors:
            try:
                result = await dist.search_product(query, {
                    "voltage_rating": voltage_rating,
                    "insulation_material": insulation_type
                })
                results.extend(result.get("products", []))
            except Exception as e:
                logger.error(f"Error: {e}")

        return results

    async def get_wire_specifications(self, part_number: str):
        """
        Get detailed wire specifications
        """
        # Try to get from any distributor
        for dist in self.distributors:
            try:
                specs = await dist.get_product_details(part_number)
                return self.extract_wire_specs(specs)
            except:
                continue

        return None

    def extract_wire_specs(self, product: dict) -> dict:
        """
        Extract standardized wire specifications
        """
        return {
            "part_number": product.get("manufacturerPartNumber"),
            "gauge_awg": self.parse_gauge(product.get("description")),
            "conductor_count": product.get("numberOfConductors", 1),
            "conductor_material": product.get("conductorMaterial", "Copper"),
            "insulation_material": product.get("insulationMaterial"),
            "jacket_material": product.get("jacketMaterial"),
            "voltage_rating": product.get("voltageRating"),
            "current_rating": product.get("currentRating"),
            "temperature_rating": product.get("temperatureRating"),
            "color": product.get("color"),
            "shielding": product.get("shielding"),
            "price_per_foot": product.get("unitPrice")
        }
```

---

## Unified Component Search API

```python
class UnifiedComponentSearch:
    """
    Unified search across all suppliers
    """

    def __init__(self):
        self.suppliers = {
            "digikey": DigikeyAPI(),
            "mouser": MouserAPI(),
            "newark": NewarkAPI(),
            "lcsc": LCSCAPI(),
            "arrow": ArrowAPI()
        }

    async def search_all(
        self,
        part_number: str = None,
        keyword: str = None,
        category: str = None,
        filters: dict = None
    ) -> List[ComponentResult]:
        """
        Search all suppliers in parallel
        """
        tasks = []

        for supplier_name, supplier_api in self.suppliers.items():
            if part_number:
                task = self._search_by_part(supplier_api, part_number)
            else:
                task = self._search_by_keyword(supplier_api, keyword, filters)

            tasks.append(task)

        # Execute all searches in parallel
        results = await asyncio.gather(*tasks, return_exceptions=True)

        # Combine and rank results
        combined = []
        for supplier_name, result in zip(self.suppliers.keys(), results):
            if isinstance(result, Exception):
                logger.warning(f"Error from {supplier_name}: {result}")
                continue

            for item in result:
                combined.append({
                    **item,
                    "supplier": supplier_name
                })

        # Deduplicate by manufacturer part number
        deduplicated = self.deduplicate_by_mpn(combined)

        # Rank by price, availability, lead time
        ranked = self.rank_results(deduplicated)

        return ranked

    async def _search_by_part(self, supplier_api, part_number: str):
        """
        Search by part number
        """
        try:
            return await supplier_api.search_by_part_number(part_number)
        except Exception as e:
            return []

    async def _search_by_keyword(self, supplier_api, keyword: str, filters: dict):
        """
        Search by keyword
        """
        try:
            return await supplier_api.search_product(keyword, filters)
        except Exception as e:
            return []

    def deduplicate_by_mpn(self, results: List[dict]) -> List[dict]:
        """
        Group results by manufacturer part number
        """
        grouped = {}

        for result in results:
            mpn = result.get("manufacturerPartNumber")
            if not mpn:
                continue

            if mpn not in grouped:
                grouped[mpn] = {
                    "manufacturerPartNumber": mpn,
                    "description": result.get("description"),
                    "manufacturer": result.get("manufacturer"),
                    "suppliers": []
                }

            grouped[mpn]["suppliers"].append({
                "supplier": result["supplier"],
                "sku": result.get("sku"),
                "unitPrice": result.get("unitPrice"),
                "inStock": result.get("inStock"),
                "leadTimeDays": result.get("leadTimeDays"),
                "datasheetUrl": result.get("datasheetUrl")
            })

        return list(grouped.values())

    def rank_results(self, results: List[dict]) -> List[dict]:
        """
        Rank results by multiple factors
        """
        def score(result):
            suppliers = result["suppliers"]

            # Get best price
            best_price = min(
                (s["unitPrice"] for s in suppliers if s.get("unitPrice")),
                default=float('inf')
            )

            # Check availability
            total_stock = sum(s.get("inStock", 0) for s in suppliers)

            # Best lead time
            best_lead = min(
                (s.get("leadTimeDays", 999) for s in suppliers),
                default=999
            )

            # Calculate score (lower is better)
            price_score = best_price
            availability_score = -total_stock  # More stock = better
            lead_time_score = best_lead

            return (price_score * 0.5) + (availability_score * 0.01) + (lead_time_score * 0.1)

        return sorted(results, key=score)
```

---

## Caching & Rate Limiting Strategy

```python
class CachedSupplierAPI:
    """
    Wrapper for supplier APIs with caching and rate limiting
    """

    def __init__(self, supplier_api, cache_ttl: int = 1800):
        self.api = supplier_api
        self.cache = redis.Redis()
        self.cache_ttl = cache_ttl
        self.rate_limiter = RateLimiter(supplier_api.__class__.__name__)

    async def search_product(self, query: str, filters: dict = None):
        """
        Cached product search
        """
        cache_key = f"search:{self.api.__class__.__name__}:{query}:{hash(str(filters))}"

        # Check cache
        cached = await self.cache.get(cache_key)
        if cached:
            return json.loads(cached)

        # Rate limit
        await self.rate_limiter.acquire()

        # Call API
        result = await self.api.search_product(query, filters)

        # Cache result
        await self.cache.setex(cache_key, self.cache_ttl, json.dumps(result))

        return result

    async def get_pricing(self, part_number: str, quantity: int):
        """
        Cached pricing lookup
        """
        cache_key = f"price:{self.api.__class__.__name__}:{part_number}:{quantity}"

        cached = await self.cache.get(cache_key)
        if cached:
            return json.loads(cached)

        await self.rate_limiter.acquire()

        result = await self.api.get_pricing(part_number, quantity)

        await self.cache.setex(cache_key, self.cache_ttl, json.dumps(result))

        return result
```

---

## Background Sync Jobs

```python
class ComponentDatabaseSync:
    """
    Background job to sync component database with suppliers
    """

    async def sync_popular_components(self):
        """
        Sync frequently used components (daily)
        """
        popular_parts = await self.get_popular_part_numbers(limit=1000)

        for part_number in popular_parts:
            try:
                await self.sync_component(part_number)
            except Exception as e:
                logger.error(f"Error syncing {part_number}: {e}")

            await asyncio.sleep(0.5)  # Respect rate limits

    async def sync_component(self, part_number: str):
        """
        Sync single component from all suppliers
        """
        unified_search = UnifiedComponentSearch()
        results = await unified_search.search_all(part_number=part_number)

        # Update database
        await self.db.upsert("components", {
            "part_number": part_number,
            "suppliers": results,
            "last_synced": datetime.now()
        })
```

---

## API Integration Summary

| Supplier | API Access | Rate Limit | Cost | Priority |
|----------|-----------|------------|------|----------|
| Digikey | Public API | 1000/hr | Free | High |
| Mouser | Public API | 100k/day | Free | High |
| Newark | Public API | 10k/day | Free | Medium |
| LCSC | Public API | 5k/day | Free | Medium |
| Arrow | Partner API | Custom | Free | Medium |
| TE Connectivity | B2B Integration | Custom | Custom | High |
| Molex | Via Distributors | N/A | Free | High |
| Amphenol | Via Distributors | N/A | Free | Medium |
| JST | Via Distributors | N/A | Free | Medium |
| Hirose | Via Distributors | N/A | Free | Low |
| Belden | Via Distributors | N/A | Free | Medium |
| Alpha Wire | Via Distributors | N/A | Free | Medium |

**Implementation Priority**:
1. **Phase 1**: Digikey, Mouser, Newark (cover 90% of components)
2. **Phase 2**: LCSC (cost-effective options)
3. **Phase 3**: Direct manufacturer integrations (TE, Molex)
4. **Phase 4**: Specialty suppliers and regional distributors

**Total Coverage**:
- 10M+ electronic components
- 100K+ connectors
- 50K+ wire/cable products
- Real-time pricing for 95%+ of common parts
