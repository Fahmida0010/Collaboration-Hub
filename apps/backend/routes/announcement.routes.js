const express = require("express");
const router = express.Router();

const {
  createAnnouncement,
  getAnnouncements,
  pinAnnouncement,
  addComment,
  addReaction,
} = require("../controllers/announcement.controller");

const auth = require("../middleware/auth.middleware");

router.post("/", auth, createAnnouncement);
router.get("/:workspaceId", auth, getAnnouncements);
router.patch("/pin/:id", auth, pinAnnouncement);
router.post("/comment", auth, addComment);
router.post("/reaction", auth, addReaction);

module.exports = router;