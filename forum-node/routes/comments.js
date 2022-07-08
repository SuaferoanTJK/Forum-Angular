const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/topic/:topicID",
  [check("content", "Content is required").not().isEmpty()],
  auth,
  commentController.add
);
router.put(
  "/:id",
  [check("content", "Content is required").not().isEmpty()],
  auth,
  commentController.update
);
router.delete("/topic/:topicID&:commentID", auth, commentController.delete);

module.exports = router;
