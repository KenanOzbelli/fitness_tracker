const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

const db = require("./models");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workoutdb", {
  useNewUrlParser: true
});

app.get("/api/workouts", ({ body }, res) => {
  db.Workout.find({})
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      console.log(err);
    });
});
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  )
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});
app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.sendfile("index.html");
});
app.get("/exercise", (req, res) => {
  res.sendfile("./public/exercise.html");
});

app.get("/stats", (req, res) => {
  res.sendfile("./public/stats.html");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
