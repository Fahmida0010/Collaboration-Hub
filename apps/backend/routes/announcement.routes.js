const express = require("express");
const router = express.Router();

const {
  createAnnouncement,
  getAnnouncements,
  pinAnnouncement,
  addComment,
  addReaction,
} = require("../controllers/announcement.controller");
const authMiddleware = require("../middleware/auth.middleware");


router.post("/", authMiddleware, createAnnouncement);
router.get("/:workspaceId", authMiddleware, getAnnouncements);
router.patch("/pin/:id", authMiddleware, pinAnnouncement);
router.post("/comment", authMiddleware, addComment);
router.post("/reaction", authMiddleware, addReaction);

module.exports = router;