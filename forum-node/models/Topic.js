const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: "User" },
});

const topicSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  lang: { type: String, required: true },
  code: { type: String, trim: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: "User" },
  comments: [commentSchema],
});
topicSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Topic", topicSchema);
