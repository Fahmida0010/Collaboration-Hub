const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoals,
  addMilestone,
  addActivity,
} = require("../controllers/goal.controller");
const authMiddleware = require("../middleware/auth.middleware");



router.post("/",authMiddleware, createGoal);
router.get("/:workspaceId",authMiddleware, getGoals);
router.post("/milestone",authMiddleware, addMilestone);
router.post("/activity",authMiddleware, addActivity);

module.exports = router;