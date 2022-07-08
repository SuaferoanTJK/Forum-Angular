const Topic = require("../models/Topic");
const { validationResult } = require("express-validator");

exports.add = (req, res) => {
  // Error messages of express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const topicID = req.params.topicID;
  Topic.findById(topicID).exec((error, topic) => {
    if (error || !topic) {
      return res.status(404).json({ msg: "Topic doesn't exists" });
    } else {
      const comment = {
        user: req.user.id,
        content: req.body.content,
      };
      topic.comments.push(comment);
      topic.save((error) => {
        if (error) {
          return res
            .status(400)
            .json({ msg: "Comment wasn't able to be uploaded" });
        }
        Topic.findById(topic._id)
          .populate("user")
          .populate("comments.user")
          .exec((error, topic) => {
            if (error || !topic) {
              res.status(404).json({ msg: "Topic doesn't exists" });
            } else {
              res.json({ topic });
            }
          });
      });
    }
  });
};

exports.update = (req, res) => {
  // Error messages of express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const id = req.params.id;
  Topic.findOneAndUpdate(
    { "comments._id": id },
    { $set: { "comments.$.content": req.body.content } },
    { new: true },
    (error, topicUpdated) => {
      if (error) {
        res
          .status(400)
          .json({ msg: "There was an error trying to update the comment" });
      }
      res.json({ topicUpdated });
    }
  );
};

exports.delete = (req, res) => {
  const topicID = req.params.topicID;
  const commentID = req.params.commentID;

  Topic.findById(topicID, (error, topic) => {
    if (error) {
      return res.status(500).json({ msg: "Request failed" });
    }
    if (!topic) {
      return res.status(400).json({ msg: "Topic doesn't exists" });
    }

    const comment = topic.comments.id(commentID);
    if (comment) {
      comment.remove();
      topic.save((error) => {
        if (error) {
          return res.status(500).json({ msg: "Request failed" });
        }
        Topic.findById(topic._id)
          .populate("user")
          .populate("comments.user")
          .exec((error, topic) => {
            if (error || !topic) {
              res.status(404).json({ msg: "Topic doesn't exists" });
            } else {
              res.json({ topic });
            }
          });
      });
    } else {
      return res.status(400).json({ msg: "Comment doesn't exists" });
    }
  });
};
