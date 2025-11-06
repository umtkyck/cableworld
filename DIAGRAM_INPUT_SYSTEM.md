# Cable Harness Diagram Input System - User Flow & Technical Design

## Overview
This document outlines the user experience and technical implementation for allowing customers to upload, parse, and validate cable harness diagrams.

---

## User Flow

### Step 1: Upload Landing Page
```
┌─────────────────────────────────────────────────────────────┐
│  🎯 Get Your Instant Quote                                  │
│                                                              │
│  Upload your cable harness diagram and get a quote in       │
│  under 60 seconds.                                          │
│                                                              │
│  ┌───────────────────────────────────────────────────┐     │
│  │                                                     │     │
│  │   📄 Drag & drop files here                        │     │
│  │      or click to browse                            │     │
│  │                                                     │     │
│  │   Supported formats:                               │     │
│  │   • CAD files (.dxf, .dwg, .step)                  │     │
│  │   • Schematics (.pdf from Altium, Eagle, KiCad)    │     │
│  │   • Excel BOM templates                            │     │
│  │   • Images/PDFs with AI parsing                    │     │
│  │                                                     │     │
│  └───────────────────────────────────────────────────┘     │
│                                                              │
│  [📊 Or use our visual harness builder]                     │
│                                                              │
│  ✓ No account required    ✓ Instant results                 │
└─────────────────────────────────────────────────────────────┘
```

**UX Features**:
- Drag-and-drop upload zone (prominent, center)
- File format icons with examples
- Progress indicator during upload
- Quick start templates for common harness types

---

### Step 2: File Processing & Validation

#### 2.1 Upload Progress
```
┌─────────────────────────────────────────────────────────────┐
│  ⏳ Processing your diagram...                              │
│                                                              │
│  [████████████████░░░░░░░░░] 75%                           │
│                                                              │
│  ✓ File uploaded                                            │
│  ✓ Format validated                                         │
│  ⏳ Extracting components...                                │
│  ⏳ Calculating specifications...                           │
└─────────────────────────────────────────────────────────────┘
```

#### 2.2 Parsing Results
```
┌─────────────────────────────────────────────────────────────┐
│  ✓ Diagram Processed Successfully!                          │
│                                                              │
│  ┌─────────────────┬─────────────────────────────────────┐ │
│  │                 │  📊 Detected Components              │ │
│  │  [3D Preview]   │                                       │ │
│  │                 │  Connectors: 12                       │ │
│  │  [Rotate/Zoom]  │  Wire Types: 5                        │ │
│  │                 │  Total Length: 2.5m                   │ │
│  │                 │  Terminals: 48                        │ │
│  └─────────────────┴─────────────────────────────────────┘ │
│                                                              │
│  [📝 View/Edit BOM] [⚠️ 2 items need clarification]        │
└─────────────────────────────────────────────────────────────┘
```

---

### Step 3: Component Review & Validation

```
┌─────────────────────────────────────────────────────────────┐
│  Review & Confirm Components                                 │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Item │ Part Number  │ Description      │ Qty │ Status │  │
│  ├──────┼──────────────┼──────────────────┼─────┼────────┤  │
│  │ 1    │ TE-123456    │ Conn, 6-pin male │ 2   │ ✓      │  │
│  │ 2    │ Unknown      │ Wire 18AWG red   │ 5m  │ ⚠️     │  │
│  │ 3    │ Molex-78910  │ Term, crimp      │ 12  │ ✓      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ⚠️ Item 2 needs clarification:                             │
│  We detected "18AWG red wire" but couldn't identify         │
│  the exact part number.                                      │
│                                                              │
│  Suggested alternatives:                                     │
│  ○ Belden 8503 - 18AWG Red, 600V ($0.45/ft)                │
│  ○ Alpha Wire 3051 - 18AWG Red, 300V ($0.38/ft)            │
│  ● Custom specification (enter details)                     │
│                                                              │
│  [Continue to Quote]                                        │
└─────────────────────────────────────────────────────────────┘
```

**Features**:
- Interactive BOM table with inline editing
- Automatic component matching from supplier databases
- Flagged items requiring user input
- Suggested alternatives with pricing
- Real-time validation feedback

---

### Step 4: Design Review & DFM Check

```
┌─────────────────────────────────────────────────────────────┐
│  Design for Manufacturing Analysis                           │
│                                                              │
│  ┌─────────────────┬─────────────────────────────────────┐ │
│  │                 │  📋 DFM Results                       │ │
│  │  [Interactive]  │                                       │ │
│  │  [3D Model]     │  ✓ 8 checks passed                    │ │
│  │                 │  ⚠️ 2 recommendations                 │ │
│  │  [Highlight]    │  ❌ 1 issue found                     │ │
│  │  [Issues]       │                                       │ │
│  └─────────────────┴─────────────────────────────────────┘ │
│                                                              │
│  ❌ Critical Issue:                                         │
│  Wire gauge too small for amperage requirements             │
│  • Detected: 22AWG for 5A load                              │
│  • Recommended: 18AWG minimum                               │
│  [Auto-fix with 18AWG] [Keep as-is (not recommended)]      │
│                                                              │
│  ⚠️ Recommendations:                                        │
│  1. Add strain relief boots to connectors (-$2.50 ea)       │
│  2. Use pre-terminated wires to reduce labor (-15% cost)    │
│                                                              │
│  [Apply All Recommendations] [Continue Without Changes]     │
└─────────────────────────────────────────────────────────────┘
```

**DFM Checks**:
- Wire gauge vs. current capacity
- Connector pin count matching
- Bend radius violations
- Length optimization
- Termination method validation
- Standards compliance (IPC-620, MIL-STD)

---

### Step 5: Specification Finalization

```
┌─────────────────────────────────────────────────────────────┐
│  Final Specifications                                        │
│                                                              │
│  Quantity: [____100____] units    [Get volume discount]     │
│                                                              │
│  Quality Level:                                              │
│  ○ Standard (IPC-610 Class 2)                               │
│  ● Professional (IPC-610 Class 3)  +$15/unit                │
│  ○ Aerospace (AS9100)               +$45/unit                │
│                                                              │
│  Testing Requirements:                                       │
│  ☑ Continuity test (included)                               │
│  ☑ Hi-pot test         +$5/unit                             │
│  ☐ Pull force test     +$8/unit                             │
│  ☐ Custom test plan    [Specify]                            │
│                                                              │
│  Lead Time:                                                  │
│  ○ Standard (15 business days)   Delivery: Dec 15           │
│  ● Express (7 business days)     Delivery: Dec 7  +20%      │
│  ○ Rush (3 business days)        Delivery: Dec 3  +45%      │
│                                                              │
│  Additional Requirements:                                    │
│  ☐ Custom labeling                                          │
│  ☐ Protective sleeving                                      │
│  ☐ Custom packaging                                         │
│  ☑ RoHS compliance certification                            │
│                                                              │
│  [Get Instant Quote]                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Architecture

### File Upload System

#### Frontend Component Structure
```javascript
components/
├── upload/
│   ├── FileUploader.tsx          // Drag-drop zone
│   ├── FileValidator.tsx          // Client-side validation
│   ├── UploadProgress.tsx         // Progress indicator
│   └── SupportedFormats.tsx       // Format info panel
│
├── diagram-parser/
│   ├── CADViewer.tsx              // 3D visualization
│   ├── BOMEditor.tsx              // Editable BOM table
│   ├── ComponentMatcher.tsx       // AI suggestions
│   └── DFMAnalysis.tsx            // Design checks
│
└── quote-builder/
    ├── SpecificationForm.tsx      // Final specs
    ├── VolumeCalculator.tsx       // Quantity pricing
    └── LeadTimeSelector.tsx       // Delivery options
```

#### Backend Architecture
```python
# File Upload Service (FastAPI)
@app.post("/api/upload")
async def upload_diagram(file: UploadFile):
    """
    1. Validate file type and size
    2. Upload to S3 with unique ID
    3. Queue parsing job
    4. Return job ID for polling
    """
    file_id = generate_unique_id()
    s3_key = f"uploads/{file_id}/{file.filename}"

    # Upload to S3
    await s3_client.upload_fileobj(file.file, BUCKET, s3_key)

    # Queue parsing job
    job = await queue.enqueue(
        "parse_diagram",
        file_id=file_id,
        s3_key=s3_key,
        file_type=file.content_type
    )

    return {"file_id": file_id, "job_id": job.id}


# Diagram Parsing Service
class DiagramParser:
    def __init__(self):
        self.cad_parser = CADParser()          # OpenCascade
        self.pdf_parser = PDFParser()          # PyMuPDF
        self.ocr_engine = OCREngine()          # Google Vision
        self.ai_parser = AIParser()            # GPT-4 Vision
        self.component_db = ComponentDatabase()

    async def parse(self, file_path: str, file_type: str):
        """
        Parse diagram based on file type
        """
        if file_type in ['dxf', 'dwg', 'step']:
            return await self.parse_cad(file_path)
        elif file_type == 'pdf':
            return await self.parse_pdf(file_path)
        elif file_type in ['xlsx', 'csv']:
            return await self.parse_bom(file_path)
        elif file_type in ['png', 'jpg']:
            return await self.parse_image(file_path)

    async def parse_cad(self, file_path: str):
        """
        Extract harness geometry from CAD file
        """
        # Load 3D model
        model = self.cad_parser.load(file_path)

        # Extract wires/cables (lines/curves)
        wires = model.extract_curves()

        # Extract connectors (components)
        connectors = model.extract_components()

        # Calculate total wire length
        total_length = sum(w.length for w in wires)

        # Generate BOM
        bom = self.generate_bom_from_model(wires, connectors)

        return {
            "geometry": model.to_json(),
            "wires": wires,
            "connectors": connectors,
            "total_length": total_length,
            "bom": bom
        }

    async def parse_pdf(self, file_path: str):
        """
        Extract harness info from PDF schematic
        """
        # Extract text
        text = self.pdf_parser.extract_text(file_path)

        # Extract images/diagrams
        images = self.pdf_parser.extract_images(file_path)

        # OCR on images if needed
        if images:
            ocr_text = await self.ocr_engine.process(images[0])
            text += "\n" + ocr_text

        # AI parsing for component extraction
        components = await self.ai_parser.extract_components(
            text=text,
            images=images
        )

        # Match components to database
        matched_bom = await self.match_components(components)

        return {
            "raw_text": text,
            "components": components,
            "bom": matched_bom
        }

    async def match_components(self, components: List[dict]):
        """
        Match extracted components to supplier databases
        """
        matched = []

        for comp in components:
            # Search component database
            matches = await self.component_db.search(
                description=comp['description'],
                part_number=comp.get('part_number'),
                manufacturer=comp.get('manufacturer')
            )

            if matches:
                # Take best match
                matched.append({
                    **comp,
                    "matched_part": matches[0],
                    "confidence": matches[0]['score'],
                    "alternatives": matches[1:5]
                })
            else:
                # Flag for manual review
                matched.append({
                    **comp,
                    "matched_part": None,
                    "requires_review": True
                })

        return matched


# Component Database Service
class ComponentDatabase:
    def __init__(self):
        self.es = Elasticsearch()  # Elasticsearch for search
        self.redis = Redis()       # Redis for caching

    async def search(self, description: str, part_number: str = None,
                    manufacturer: str = None):
        """
        Search across all supplier databases
        """
        # Check cache first
        cache_key = f"component:{part_number or description}"
        cached = await self.redis.get(cache_key)
        if cached:
            return json.loads(cached)

        # Build Elasticsearch query
        query = {
            "multi_match": {
                "query": description,
                "fields": ["description^3", "keywords^2", "specs"]
            }
        }

        if part_number:
            query = {
                "bool": {
                    "should": [
                        {"match": {"part_number": part_number}},
                        query
                    ]
                }
            }

        # Search
        results = await self.es.search(
            index="components",
            body={"query": query},
            size=10
        )

        # Cache results
        await self.redis.setex(cache_key, 3600, json.dumps(results))

        return results['hits']['hits']
```

---

## AI Parsing Engine

### GPT-4 Vision Integration

```python
class AIParser:
    def __init__(self):
        self.client = OpenAI()

    async def extract_components(self, text: str = None,
                                 images: List[bytes] = None):
        """
        Use GPT-4 Vision to extract harness components
        """
        messages = [{
            "role": "system",
            "content": """You are an expert in cable and wire harness
            design. Extract all components from the provided diagram/text
            and return a structured BOM."""
        }]

        if text:
            messages.append({
                "role": "user",
                "content": f"Extract components from:\n\n{text}"
            })

        if images:
            messages.append({
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64.b64encode(images[0]).decode()}"
                        }
                    },
                    {
                        "type": "text",
                        "text": "Extract all connectors, wires, terminals, and components from this harness diagram."
                    }
                ]
            })

        response = await self.client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=messages,
            functions=[{
                "name": "extract_bom",
                "description": "Extract bill of materials from harness diagram",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "components": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "type": {"type": "string", "enum": ["connector", "wire", "terminal", "other"]},
                                    "description": {"type": "string"},
                                    "part_number": {"type": "string"},
                                    "manufacturer": {"type": "string"},
                                    "quantity": {"type": "number"},
                                    "specifications": {"type": "object"}
                                }
                            }
                        }
                    }
                }
            }],
            function_call={"name": "extract_bom"}
        )

        return json.loads(response.choices[0].message.function_call.arguments)
```

---

## DFM Analysis Engine

```python
class DFMAnalyzer:
    """
    Design for Manufacturing analysis
    """

    def analyze(self, harness: dict) -> dict:
        """
        Run all DFM checks
        """
        issues = []
        warnings = []
        recommendations = []

        # Check 1: Wire gauge vs. current
        issues.extend(self.check_wire_ampacity(harness))

        # Check 2: Connector compatibility
        issues.extend(self.check_connector_compatibility(harness))

        # Check 3: Bend radius
        warnings.extend(self.check_bend_radius(harness))

        # Check 4: Length optimization
        recommendations.extend(self.optimize_lengths(harness))

        # Check 5: Cost optimization
        recommendations.extend(self.optimize_costs(harness))

        return {
            "issues": issues,
            "warnings": warnings,
            "recommendations": recommendations,
            "score": self.calculate_dfm_score(issues, warnings)
        }

    def check_wire_ampacity(self, harness: dict):
        """
        Verify wire gauge can handle current load
        """
        issues = []

        for wire in harness.get('wires', []):
            gauge = wire.get('gauge')
            current = wire.get('current_rating')

            if gauge and current:
                max_current = self.get_wire_ampacity(gauge)

                if current > max_current:
                    issues.append({
                        "severity": "critical",
                        "component": wire['id'],
                        "message": f"Wire gauge {gauge}AWG insufficient for {current}A (max {max_current}A)",
                        "suggestion": f"Use minimum {self.get_required_gauge(current)}AWG",
                        "auto_fix": True
                    })

        return issues

    def optimize_costs(self, harness: dict):
        """
        Suggest cost-saving alternatives
        """
        recommendations = []

        # Check for pre-terminated options
        for component in harness.get('components', []):
            if component['type'] == 'wire':
                preterminated = self.find_preterminated_alternative(component)
                if preterminated and preterminated['cost'] < component['cost']:
                    recommendations.append({
                        "type": "cost_savings",
                        "component": component['id'],
                        "message": f"Save ${component['cost'] - preterminated['cost']:.2f} per unit",
                        "suggestion": f"Use pre-terminated {preterminated['part_number']}",
                        "savings": component['cost'] - preterminated['cost']
                    })

        return recommendations
```

---

## Real-time Validation

### WebSocket Updates
```javascript
// Frontend: Real-time parsing updates
const useRealtimeParsing = (fileId) => {
  const [status, setStatus] = useState('uploading');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://api.loombotic.com/ws/${fileId}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'progress':
          setProgress(data.progress);
          setStatus(data.status);
          break;
        case 'complete':
          setResult(data.result);
          setStatus('complete');
          break;
        case 'error':
          setStatus('error');
          break;
      }
    };

    return () => ws.close();
  }, [fileId]);

  return { status, progress, result };
};
```

---

## Performance Requirements

- **Upload Speed**: Support up to 100MB files
- **Parse Time**: < 30 seconds for 90% of diagrams
- **AI Response**: < 10 seconds for GPT-4 Vision
- **3D Render**: < 2 seconds initial load
- **Component Search**: < 500ms per query
- **Real-time Updates**: < 100ms WebSocket latency

---

## Mobile Experience

- Responsive design for tablet/mobile upload
- Camera integration for quick photo upload
- Progressive Web App (PWA) for offline capability
- Simplified mobile flow (fewer steps)
- Touch-optimized 3D viewer

---

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation throughout
- Screen reader support
- High contrast mode
- Alternative text for all images/diagrams

---

## Analytics & Tracking

**Key Events**:
- File uploaded
- Parse started/completed
- Component matched/unmatched
- DFM issue found
- User edit to BOM
- Quote requested

**Metrics**:
- Average parse time by file type
- Component match accuracy
- User edit rate (indicates parsing quality)
- Abandonment rate by step
- Time to quote
