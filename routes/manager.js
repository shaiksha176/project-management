const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Task = require("../models/task.model");
const Task_tracer = require("../models/task_tracer.model");

const checkAuth = (req, res, next) => {
  if (req.session.userId && req.session.role) next();
  else res.redirect("/login");
};

router.get("/", checkAuth, (req, res) => {
  User.find({ role: "employee" }, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.render("manager", { users: data });
  });
});

router.post("/addtask", checkAuth, (req, res) => {
  const task = new Task({
    task_name: req.body.task_name,

    given_to: req.body.given_to,
  });
  task
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => console.log(error));
});

router.get("/all/tasks", checkAuth, (req, res) => {
  Task_tracer.find({})
    .populate("task")
    .populate("employee")
    .then((data) => {
      // console.log(data);
      res.render("manage_tasks", { data });
    });
});

router.post("/task/delete", checkAuth, (req, res) => {
  Task_tracer.findByIdAndDelete({ _id: req.body.task._id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send("task deleted successfully");
  });
});
module.exports = router;
