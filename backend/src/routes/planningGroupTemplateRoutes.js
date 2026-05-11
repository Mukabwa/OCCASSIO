const express = require("express");

const {
  getTemplates,
} = require(
  "../controllers/planningGroupTemplateController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTemplates);

module.exports = router;