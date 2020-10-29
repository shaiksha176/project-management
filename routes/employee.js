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

router.get("/", (req, res) => {
  res.send(
    `

<a href="/login">Login</a>
<a href="/register">Register</a>

`
  );
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/register", (req, res) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password,
  });
  user
    .save()
    .then((data) => {
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  User.findOne(
    { name: req.body.name, password: req.body.password },
    (err, user) => {
      if (user) {
        req.session.userId = user._id;
        req.session.role = user.role;
        if (req.session.role == "manager") {
          res.redirect("/manager");
        } else {
          res.redirect("/employee");
        }
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/employee", checkAuth, (req, res) => {
  Task.find({ given_to: req.session.userId }, (err, tasks) => {
    if (tasks) {
      console.log(tasks);

      res.render("employee", { tasks });
    }
  });
});

router.post("/submit", checkAuth, (req, res) => {
  const task = new Task_tracer({
    task: req.body.task._id,
    employee: req.session.userId,
    note: req.body.note,
  });
  task
    .save()
    .then((data) => {
      res.send("placed order successfully");
    })
    .catch((error) => console.log(error));
});

router.get("/logout", checkAuth, (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
