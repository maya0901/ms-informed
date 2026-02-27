const express = require("express");
const axios = require("axios");
const womenData = require("../data/womenData.json");

const router = express.Router();

// Simple in-memory cache (avoids repeated FDA calls)
const cache = {};

router.post("/", async (req, res) => {
  try {
    // 1️⃣ Validate input
    if (!req.body.drug) {
      return res.status(400).json({ error: "Drug name is required" });
    }

    // 2️⃣ Normalize drug name (avoid casing issues)
    const normalizedDrug = req.body.drug.toLowerCase().trim();

    // 3️⃣ Check cache first
    if (cache[normalizedDrug]) {
      return res.json(cache[normalizedDrug]);
    }

    // 4️⃣ Fetch official FDA data (generic OR brand name match)
    const response = await axios.get(
      `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${normalizedDrug}+OR+openfda.brand_name:${normalizedDrug}&limit=1`
    );

    const data = response.data.results[0];

    // 5️⃣ Extract relevant official sections
    // Some drugs store effects in different label fields
    const official = [
      ...(data.adverse_reactions || []),
      ...(data.warnings || []),
      ...(data.precautions || [])
    ];

    // Convert official array into one searchable lowercase string
    const officialText = official.join(" ").toLowerCase();

    // 6️⃣ Load women-reported dataset
    const women = womenData[normalizedDrug] || {};

    // 7️⃣ Identify under-discussed symptoms
    // We compare machine keys (snake_case) to readable phrases
    const underDiscussed = Object.keys(women).filter(symptom =>
      !officialText.includes(symptom.split("_").join(" "))
    );

    // 8️⃣ Construct response object
    const result = {
      drug: normalizedDrug,
      official_side_effects: official,
      women_reported: women,
      under_discussed: underDiscussed
    };

    // 9️⃣ Store in cache
    cache[normalizedDrug] = result;

    // 🔟 Return final response
    res.json(result);

  } catch (err) {
    res.status(404).json({
      error: "Drug not found in FDA database"
    });
  }
});

module.exports = router;