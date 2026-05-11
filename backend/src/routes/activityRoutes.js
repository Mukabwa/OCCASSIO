const express = require("express");

const {
  createActivity,
  getTaskActivities,
} = require(
  "../controllers/activityController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.use(authMiddleware);

router.post("/", createActivity);

router.get(
  "/task/:taskId",
  getTaskActivities
);

module.exports = router;