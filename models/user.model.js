const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user_schema = new Schema(
  {
    name: {
      type: String,
    },

    password: {
      type: String,
    },
    role: {
      type: String,
      default: "employee",
      enum: ["employee", "manager"],
    },
    tasks: [
      {
        note: {
          type: String,
        },

        project1: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Task",
        },
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", user_schema);

module.exports = User;
