const express = require("express");
const axios = require("axios");
const router = express.Router();

const womenData = require("../data/womenData.json");

router.get("/:name", async (req, res) => {
  try {
    // Normalize drug name casing
    const rawName = req.params.name;
    const drugName =
      rawName.charAt(0).toUpperCase() +
      rawName.slice(1).toLowerCase();

    // Fetch from OpenFDA
    const response = await axios.get(
      `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${drugName}&limit=1`
    );

    const data = response.data.results[0];

    let cleanEffects = [];

    if (data.adverse_reactions) {
      const rawText = data.adverse_reactions.join(" ");

      /**
       * Extract symptoms from percentage tables.
       * Matches patterns like:
       * "Nausea 25 11"
       * "Insomnia 21 11"
       */
      const regex = /([A-Za-z\s\/]+?)\s+\d{1,2}\s+\d{1,2}/g;

      let match;
      while ((match = regex.exec(rawText)) !== null) {
        let symptom = match[1]
          .trim()
          .toLowerCase()
          .replace(/\/.*/, "")   // remove slash variants
          .replace(/\s+/g, " "); // normalize spacing

        // Filter garbage terms
        if (
          symptom.length > 3 &&
          !symptom.includes("table") &&
          !symptom.includes("disorder") &&
          !symptom.includes("system") &&
          !symptom.includes("percentage")
        ) {
          cleanEffects.push(symptom);
        }
      }
    }

    // Remove duplicates + limit
    cleanEffects = [...new Set(cleanEffects)].slice(0, 20);

    res.json({
      drug: drugName,
      official_side_effects: cleanEffects,
      women_reported: womenData[drugName.toLowerCase()] || {}
    });

  } catch (err) {
    res.status(500).json({ error: "Drug not found" });
  }
});

module.exports = router;