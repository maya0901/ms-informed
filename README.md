# Women's Drug Side Effects Analyzer

A full-stack application that surfaces under-discussed drug side effects reported by women by cross-referencing FDA official labeling with community-sourced symptom data.

---

## Overview

Official drug documentation is often based on clinical trials that historically underrepresented women. This tool compares FDA-labeled side effects against a curated dataset of symptoms commonly reported by women, highlights gaps, and generates actionable questions patients can bring to their healthcare providers.

---

## Project Structure

```
├── data/
│   └── womenData.json          # Community-reported symptom frequencies by drug
├── routes/
│   ├── drug.js                 # GET /api/drug/:name — fetch + parse FDA label data
│   └── analysis.js             # POST /api/analysis — full comparison + insight generation
├── services/
│   └── insights.js             # Rule-based insight and doctor question generator
├── App.jsx                     # React frontend
└── server.js                   # Express server entry point
```

---

## API Endpoints

### `GET /api/drug/:name`

Fetches official side effects from the OpenFDA API for a given drug and returns community-reported symptoms alongside them.

**Example:** `GET /api/drug/sertraline`

```json
{
  "drug": "Sertraline",
  "official_side_effects": ["nausea", "insomnia", "diarrhea"],
  "women_reported": {
    "cycle_irregularity": 34,
    "low_libido": 52,
    "emotional_blunting": 67,
    "weight_gain": 28
  }
}
```

---

### `POST /api/analysis`

Performs a full analysis: fetches FDA data, filters community symptoms above a frequency threshold (>20 reports), detects symptoms absent from official documentation, and generates insights.

**Request body:**
```json
{ "drug": "sertraline" }
```

**Response:**
```json
{
  "drug": "sertraline",
  "official_side_effects": ["..."],
  "community": {
    "reported": { "low_libido": 52, "emotional_blunting": 67 },
    "under_discussed": ["low_libido", "emotional_blunting"]
  },
  "insights": {
    "summary": "Several community-reported symptoms such as low libido, emotional blunting appear more frequently among women but are not clearly emphasized in official documentation.",
    "doctor_questions": [
      "Could low libido be related to my use of sertraline?",
      "Could emotional blunting be related to my use of sertraline?"
    ]
  }
}
```

Results are cached in memory to avoid redundant FDA API calls.

---

## Supported Drugs (Community Dataset)

| Drug | Key Reported Symptoms |
|---|---|
| Sertraline | Cycle irregularity, low libido, emotional blunting |
| Fluoxetine | Cycle changes, reduced libido, sleep disturbance |
| Ambien | Next-day drowsiness, memory gaps, sleep driving |
| Levothyroxine | Hair loss, heart palpitations, anxiety |
| Metformin | Nausea, cycle disruption, vitamin B12 depletion |
| Ibuprofen | Heavy periods, bloating, stomach cramps |
| Aspirin | Heavier periods, stomach irritation, nausea |

---

## Getting Started

### Prerequisites

- Node.js v16+
- npm

### Installation

```bash
npm install
```

### Running the Server

```bash
node server.js
```

The server starts on **http://localhost:5000**.

### Running the Frontend

```bash
npm start
```

---

## Dependencies

- **Express** — HTTP server and routing
- **Axios** — OpenFDA API requests
- **CORS** — Cross-origin support for the React frontend
- **React** — Frontend UI

---

## Data Notes

`womenData.json` contains symptom frequency counts representing how often each symptom was reported by women in community sources. Only symptoms with a count above **20** are included in analysis to reduce noise. This dataset is intended to be expanded over time.

---

## Limitations

- Community data is static and not drawn from a clinical study.
- FDA label text matching is keyword-based and may produce false negatives for synonymous terms.
- In-memory caching resets on server restart.
