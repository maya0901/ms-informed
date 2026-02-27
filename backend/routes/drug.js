const womenData = require("../data/womenData.json");
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:name", async (req, res) => {
  try {
    const drugName = req.params.name;

    const response = await axios.get(
      `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${drugName}&limit=1`
    );

    const data = response.data.results[0];

   res.json({
  drug: drugName,
  official_side_effects: data.adverse_reactions || [],
  women_reported: womenData[drugName.toLowerCase()] || {}
   });

  } catch (error) {
    res.status(500).json({ error: "Drug not found" });
  }
});

module.exports = router;