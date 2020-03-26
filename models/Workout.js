const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutData = new Schema(
  {
    day: {
      type: Date,
      default: () => new Date()
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Please enter excercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "Please enter a name"
        },
        duration: {
          type: Number,
          required: "please enter a duration"
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);
workoutData.virtual("totalDuration").get(function() {
  return this.exercises.reduce((total, excercise) => {
    return total + excercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workoutData);

module.exports = Workout;
