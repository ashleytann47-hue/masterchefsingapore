const express = require("express");
const router = express.Router();
const  supabase  = require("../config/supabase");

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("contestants")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      contestants: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;