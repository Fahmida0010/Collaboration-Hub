const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { getGoals, createGoal, addMilestone, addActivity } = require("../controllers/goal.controllers");



router.post("/",authMiddleware, createGoal);
router.get("/:workspaceId",authMiddleware, getGoals);
router.post("/milestone",authMiddleware, addMilestone);
router.post("/activity",authMiddleware, addActivity);

module.exports = router;