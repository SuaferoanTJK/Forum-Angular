const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topicController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/new-topic",
  [
    check("title", "Title is required").not().isEmpty(),
    check("content", "Content is required").not().isEmpty(),
    check("lang", "Lang is required").not().isEmpty(),
  ],
  auth,
  topicController.createTopic
);
router.get("/topics/:page?", topicController.getTopics);
router.get("/user-topics/:user", topicController.getUserTopics);
router.get("/specific-topic/:id", topicController.getTopic);
router.put("/:id", auth, topicController.updateTopic);
router.delete("/:id", auth, topicController.deleteTopic);
router.get("/search/:search", topicController.search);

module.exports = router;
