const express = require("express");

const {
  createGroup,
  getOccasionGroups,
  generateGroupsFromTemplates,
} = require(
  "../controllers/groupController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/generate",
  generateGroupsFromTemplates
);

router.post("/", createGroup);

router.get(
  "/occasion/:occasionId",
  getOccasionGroups
);

module.exports = router;