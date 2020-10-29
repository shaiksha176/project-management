const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    note: {
      type: String,
    },

    done: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

const Task_tracer = mongoose.model("Task_tracer", schema);
module.exports = Task_tracer;
