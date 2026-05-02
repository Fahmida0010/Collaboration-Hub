// GET
export const getAll = async (req, res) => {
  const data = await prisma.announcement.findMany({
    orderBy: [
      { isPinned: "desc" },
      { createdAt: "desc" },
    ],
    include: {
      reactions: true,
      comments: true,
    },
  });

  res.json(data);
};

// CREATE
export const create = async (req, res) => {
  const userId = req.headers["x-user-id"]; 

  const { content } = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const newItem = await prisma.announcement.create({
    data: {
      content,
      userId,
    },
  });

  res.json(newItem);
};

// REACTION
export const react = async (req, res) => {
  const userId = req.headers["x-user-id"];
  const { emoji } = req.body;

  await prisma.reaction.create({
    data: {
      emoji,
      userId,
      announcementId: req.params.id,
    },
  });

  res.json({ success: true });
};

// COMMENT
export const comment = async (req, res) => {
  const userId = req.headers["x-user-id"];
  const { text } = req.body;

  await prisma.comment.create({
    data: {
      text,
      userId,
      announcementId: req.params.id,
    },
  });

  res.json({ success: true });
};