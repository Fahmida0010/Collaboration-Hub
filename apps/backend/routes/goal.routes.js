const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoals,
  addMilestone,
  addActivity,
} = require("../controllers/goal.controller");

router.post("/", createGoal);
router.get("/:workspaceId", getGoals);
router.post("/milestone", addMilestone);
router.post("/activity", addActivity);

module.exports = router;