const express = require("express");
const app = express();
const employeeRouter = require("./routes/employee");
const managerRouter = require("./routes/manager");
const mongoose = require("mongoose");
const session = require("express-session");
const helmet = require("helmet");
require("dotenv").config();
// mongoose
//   .connect("mongodb://localhost:27017/project-management", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("database connected"))
//   .catch((err) => console.log(err));

mongoose
  .connect(
    `mongodb+srv://shaiksha176:${process.env.PASSWORD}@cluster0.0kurt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", employeeRouter);
app.use("/manager", managerRouter);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Server connected at port " + PORT));
