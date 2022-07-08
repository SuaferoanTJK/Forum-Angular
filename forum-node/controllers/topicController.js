const Topic = require("../models/Topic");
const { validationResult } = require("express-validator");

exports.createTopic = (req, res) => {
  // Error messages of express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  // Create new topic
  const topic = new Topic(req.body);
  topic.user = req.user.id;
  topic.save((error, topicStored) => {
    if (error) {
      res.status(400).json({ msg: "Topic creation failed" });
    } else {
      res.json({ topic: topicStored });
    }
  });
};

exports.getTopics = (req, res) => {
  let page = req.params.page;
  if (
    page == null ||
    page == undefined ||
    page == false ||
    page == 0 ||
    page == "0"
  ) {
    page = 1;
  } else {
    page = parseInt(req.params.page);
  }

  const options = {
    sort: { date: -1 },
    populate: "user",
    limit: 5,
    page,
  };

  Topic.paginate({}, options, (error, topics) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: "An error ocurred while doing the search" });
    }
    if (!topics) {
      return res.status(400).json({ msg: "There are no topics to show" });
    }
    return res.json({
      topics: topics.docs,
      totalDocs: topics.totalDocs,
      totalPages: topics.totalPages,
    });
  });
};

exports.getUserTopics = (req, res) => {
  Topic.find({ user: req.params.user })
    .sort([["date", "descending"]])
    .exec((error, topics) => {
      if (error) {
        return res.status(500).json({ msg: "User doesn't exists" });
      }
      return res.json({ topics });
    });
};

exports.getTopic = (req, res) => {
  const topicID = req.params.id;
  Topic.findById(topicID)
    .populate("user")
    .populate("comments.user")
    .exec((error, topic) => {
      if (error || !topic) {
        res.status(404).json({ msg: "Topic doesn't exists" });
      } else {
        res.json({ topic });
      }
    });
};

exports.updateTopic = (req, res) => {
  // Error messages of express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const topicID = req.params.id;
  const params = req.body;
  if (Object.keys(params).length > 0) {
    Topic.findByIdAndUpdate(topicID, params, (error) => {
      if (error) {
        return res.status(500).json({
          error: "An error ocurred while trying to update the topic",
        });
      } else {
        return res.json({ topicDataUpdated: params });
      }
    });
  } else {
    return res.status(400).json({ msg: "At least a field is required" });
  }
};

exports.deleteTopic = (req, res) => {
  const topicID = req.params.id;
  Topic.findByIdAndDelete(
    { _id: topicID, user: req.user._id },
    (error, topicRemoved) => {
      if (error) {
        return res.status(500).json({ msg: "Error in petition" });
      }
      if (!topicRemoved) {
        return res.status(400).json({ msg: "Topic wasn't deleted" });
      }
      return res.json({ topicRemoved });
    }
  );
};

exports.search = (req, res) => {
  const search = req.params.search;

  Topic.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { lang: { $regex: search, $options: "i" } },
      { code: { $regex: search, $options: "i" } },
    ],
  })
    .sort([["date", "descending"]])
    .exec((error, topics) => {
      if (error) {
        return res.status(500).json({ msg: "Request failed" });
      }
      if (!topics) {
        return res.status(400).json({ msg: "No founds" });
      }
      return res.json({ topics });
    });
};
