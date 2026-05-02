const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE ANNOUNCEMENT
exports.createAnnouncement = async (req, res) => {
  const { title, content, workspaceId } = req.body;

  const announcement = await prisma.announcement.create({
    data: {
      title,
      content,
      workspaceId,
      isPinned: false,
    },
  });

  res.json(announcement);
};

// GET ANNOUNCEMENTS
exports.getAnnouncements = async (req, res) => {
  const { workspaceId } = req.params;

  const data = await prisma.announcement.findMany({
    where: { workspaceId },
    include: {
      comments: true,
      reactions: true,
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(data);
};

// PIN ANNOUNCEMENT
exports.pinAnnouncement = async (req, res) => {
  const { id } = req.params;

  const updated = await prisma.announcement.update({
    where: { id },
    data: { isPinned: true },
  });

  res.json(updated);
};

// ADD COMMENT
exports.addComment = async (req, res) => {
  const { text, announcementId } = req.body;

  const comment = await prisma.comment.create({
    data: {
      text,
      announcementId,
      userId: req.user.id,
    },
  });

  res.json(comment);
};

// ADD REACTION
exports.addReaction = async (req, res) => {
  const { emoji, announcementId } = req.body;

  const reaction = await prisma.reaction.create({
    data: {
      emoji,
      announcementId,
      userId: req.user.id,
    },
  });

  res.json(reaction);
};