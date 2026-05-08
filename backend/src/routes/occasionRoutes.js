const express = require("express");

const {
  createOccasion,
  getOccasions,
  getOccasionById,
} = require("../controllers/occasionController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.use(authMiddleware);

router.post("/", createOccasion);

router.get("/", getOccasions);

router.get("/:id", getOccasionById);

module.exports = router;