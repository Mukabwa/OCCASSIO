const express = require("express");

const {
  createGroup,
  getOccasionGroups,
} = require("../controllers/groupController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.use(authMiddleware);

router.post("/", createGroup);

router.get(
  "/occasion/:occasionId",
  getOccasionGroups
);

module.exports = router;