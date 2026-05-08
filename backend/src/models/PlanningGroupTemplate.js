const mongoose = require("mongoose");

const planningGroupTemplateSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      icon: {
        type: String,
        default: "",
      },

      color: {
        type: String,
        default: "",
      },

      tags: [
        {
          type: String,
          trim: true,
        },
      ],

      active: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "PlanningGroupTemplate",
  planningGroupTemplateSchema
);