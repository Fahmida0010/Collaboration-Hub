const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoals,
  addMilestone,
  addActivity,
} = require("../controllers/goal.controller");
const auth = require("../middleware/auth.middleware");


router.post("/",authMiddleware, createGoal);
router.get("/:workspaceId",authMiddleware, getGoals);
router.post("/milestone", addMilestone);
router.post("/activity", addActivity);

module.exports = router;