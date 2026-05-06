const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE GOAL
exports.createGoal = async (req, res) => {
    console.log("USER:", req.user);
  const { title, status, dueDate, workspaceId } = req.body;

  try {
    const goal = await prisma.goal.create({
      data: {
        title,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        workspaceId,
        ownerId: req.user.id, 
      },
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create goal",
      details: error.message,
    });
  }
};

// GET GOALS
exports.getGoals = async (req, res) => {
  const { workspaceId } = req.params;

  try {
    const goals = await prisma.goal.findMany({
      where: {
        workspaceId,
        ownerId: req.user.id, 
      },
      include: {
        milestones: true,
        activities: true,
      },
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch goals",
      details: error.message,
    });
  }
};

// ADD MILESTONE
exports.addMilestone = async (req, res) => {
  const { title, goalId, progress } = req.body;

  try {
    // optional security check (important)
    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        ownerId: req.user.id,
      },
      
    });

    if (!goal) {
      return res.status(403).json({ error: "Not allowed" });
    }

    const milestone = await prisma.milestone.create({
      data: {
        title,
        goalId,
        progress: Number(progress),
      },
    });

    res.status(201).json(milestone);
  } catch (error) {
    res.status(500).json({
      error: "Failed to add milestone",
      details: error.message,
    });
  }
};

// ADD ACTIVITY
exports.addActivity = async (req, res) => {
  const { message, goalId } = req.body;

  try {
    // optional security check
    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        ownerId: req.user.id,
      },
    });

    if (!goal) {
      return res.status(403).json({ error: "Not allowed" });
    }

    const activity = await prisma.activity.create({
      data: {
        message,
        goalId,
      },
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({
      error: "Failed to add activity",
      details: error.message,
    });
  }
};