const express = require("express");
const womenData = require("../data/womenData.json");
const { generateInsights } = require("../services/insights");

const router = express.Router();
const cache = {};

router.post("/", async (req, res) => {
  try {
    if (!req.body.drug) {
      return res.status(400).json({ error: "Drug name is required" });
    }

    const normalizedDrug = req.body.drug.toLowerCase().trim();

    if (cache[normalizedDrug]) {
      return res.json(cache[normalizedDrug]);
    }

    // 🔥 USE DATA PASSED FROM FRONTEND
    const official = req.body.official || [];
    const officialText = official.join(" ").toLowerCase();

    const women = womenData[normalizedDrug] || {};

    const filteredWomen = Object.entries(women)
      .filter(([_, count]) => count > 20)
      .sort((a, b) => b[1] - a[1]);

    const underDiscussed = filteredWomen
      .map(([symptom]) => symptom)
      .filter(symptom =>
        !officialText.includes(symptom.split("_").join(" "))
      );

    const insights = generateInsights(normalizedDrug, underDiscussed);

    const result = {
      drug: normalizedDrug,
      community: {
        reported: women,
        under_discussed: underDiscussed
      },
      insights
    };

    cache[normalizedDrug] = result;

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Analysis failed" });
  }
});

module.exports = router;