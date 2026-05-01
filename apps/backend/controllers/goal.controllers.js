const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE GOAL
exports.createGoal = async (req, res) => {
  const { title, status, dueDate, workspaceId } = req.body;

  const goal = await prisma.goal.create({
    data: {
      title,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
      workspaceId,
      ownerId: "demo-user", // later JWT user
    },
  });

  res.json(goal);
};

// GET GOALS
exports.getGoals = async (req, res) => {
  const { workspaceId } = req.params;

  const goals = await prisma.goal.findMany({
    where: { workspaceId },
    include: {
      milestones: true,
      activities: true,
    },
  });

  res.json(goals);
};

// ADD MILESTONE
exports.addMilestone = async (req, res) => {
  const { title, goalId, progress } = req.body;

  const milestone = await prisma.milestone.create({
    data: {
      title,
      goalId,
      progress: Number(progress),
    },
  });

  res.json(milestone);
};

// ADD ACTIVITY
exports.addActivity = async (req, res) => {
  const { message, goalId } = req.body;

  const activity = await prisma.activity.create({
    data: {
      message,
      goalId,
    },
  });

  res.json(activity);
};