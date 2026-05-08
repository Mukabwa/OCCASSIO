const express = require("express");

const {
  createTask,
  getGroupTasks,
} = require(
  "../controllers/taskController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTask);

router.get(
  "/group/:groupId",
  getGroupTasks
);

module.exports = router;