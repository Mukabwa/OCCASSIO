const express = require("express");
const Occasion = require("../models/Occasion");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route POST /api/occasions
 * Create new occasion
 */
router.post("/", protect, async (req, res) => {
  try {
    const { title, type, date, location, totalBudget } = req.body;

    if (!title || !type || !date || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const occasion = await Occasion.create({
      userId: req.user._id,
      title,
      type,
      date,
      location,
      totalBudget,
    });

    res.status(201).json(occasion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route GET /api/occasions
 * Get all occasions for logged-in user
 */
router.get("/", protect, async (req, res) => {
  try {
    const occasions = await Occasion.find({
      userId: req.user._id,
    }).sort({ date: 1 });

    const formatted = occasions.map((occ) => {
      const today = new Date();
      const eventDate = new Date(occ.date);

      const diffTime = eventDate - today;
      const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return {
        ...occ.toObject(),
        daysRemaining,
      };
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
