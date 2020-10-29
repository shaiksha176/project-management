const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    task_name: {
      type: String,
    },

    task1: {
      type: String,
    },
    task2: {
      type: String,
    },

    given_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

const Task = mongoose.model("Task", schema);
module.exports = Task;
