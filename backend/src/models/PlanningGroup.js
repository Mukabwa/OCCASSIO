// models/PlanningGroup.js

const mongoose = require("mongoose");

const planningGroupSchema =
  new mongoose.Schema(
    {
      occasionId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Occasion",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      icon: {
        type: String,
        default: "folder",
      },

      color: {
        type: String,
        default: "#A78BFA",
      },

      order: {
        type: Number,
        default: 0,
      },

      isDefault: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "PlanningGroup",
  planningGroupSchema
);