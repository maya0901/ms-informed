const express = require("express");
const axios = require("axios");
const womenData = require("../data/womenData.json");
const { generateInsights } = require("../services/insights");

const router = express.Router();
const cache = {};

router.post("/", async (req, res) => {
  try {
    // 1️⃣ Validate input
    if (!req.body.drug) {
      return res.status(400).json({ error: "Drug name is required" });
    }

    // 2️⃣ Normalize drug name
    const normalizedDrug = req.body.drug.toLowerCase().trim();

    // 3️⃣ Cache check
    if (cache[normalizedDrug]) {
      return res.json(cache[normalizedDrug]);
    }

    // 4️⃣ Fetch FDA data
    const response = await axios.get(
      `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${normalizedDrug}+OR+openfda.brand_name:${normalizedDrug}&limit=1`
    );

    const data = response.data.results[0];

    // 5️⃣ Extract official sections
    const official = [
      ...(data.adverse_reactions || []),
      ...(data.warnings || []),
      ...(data.precautions || [])
    ];

    const officialText = official.join(" ").toLowerCase();

    // 6️⃣ Get women dataset
    const women = womenData[normalizedDrug] || {};

    // 7️⃣ Apply frequency threshold (>20)
    const filteredWomen = Object.entries(women)
      .filter(([_, count]) => count > 20)
      .sort((a, b) => b[1] - a[1]);

    // 8️⃣ Detect under-discussed symptoms
    const underDiscussed = filteredWomen
      .map(([symptom]) => symptom)
      .filter(symptom =>
        !officialText.includes(symptom.split("_").join(" "))
      );

    // 9️⃣ Generate rule-based insights
    const insights = generateInsights(normalizedDrug, underDiscussed);

    const result = {
      drug: normalizedDrug,
      official_side_effects: official,
      community: {
        reported: women,
        under_discussed: underDiscussed
      },
      insights
    };

    // 🔟 Cache result
    cache[normalizedDrug] = result;

    res.json(result);

  } catch (err) {
    res.status(404).json({
      error: "Drug not found in FDA database"
    });
  }
});

module.exports = router;