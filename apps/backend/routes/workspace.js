 //create workspace
router.post("/", async (req, res) => {
  const { name, description, color } = req.body;
  const userId = req.user.id;

  const workspace = await prisma.workspace.create({
    data: {
      name,
      description,
      color,
      memberships: {
        create: {
          userId,
          role: "ADMIN",
        },
      },
    },
  });

  res.json(workspace);
});

// user workspace
router.get("/", async (req, res) => {
  const userId = req.user.id;

  const workspaces = await prisma.workspace.findMany({
    where: {
      memberships: {
        some: { userId },
      },
    },
    include: {
      memberships: true,
    },
  });

  res.json(workspaces);
});

 //invite memebers
router.post("/invite", async (req, res) => {
  const { email, workspaceId, role } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  await prisma.membership.create({
    data: {
      userId: user.id,
      workspaceId,
      role,
    },
  });

  res.json({ message: "Invited" });
});
  //switch workspace

router.post("/switch", async (req, res) => {
  const { workspaceId } = req.body;

  res.cookie("workspaceId", workspaceId, {
    httpOnly: true,
  });

  res.json({ message: "Switched" });
});