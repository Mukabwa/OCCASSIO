// models/Task.js

const mongoose = require("mongoose");

const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      notes: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "not_started",
          "in_progress",
          "done",
        ],
        default: "not_started",
      },

      dueDate: {
        type: Date,
      },

      planningGroupId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "PlanningGroup",
        required: true,
      },

      order: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Task",
  taskSchema
);