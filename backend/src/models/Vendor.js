// models/Vendor.js

// models/Vendor.js

const mongoose = require("mongoose");

const vendorSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      categories: [
        {
          type: String,
          trim: true,
        },
      ],

      services: [
        {
          type: String,
          trim: true,
        },
      ],

      location: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      contactEmail: {
        type: String,
        default: "",
        lowercase: true,
        trim: true,
      },

      phoneNumber: {
        type: String,
        default: "",
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Vendor",
  vendorSchema
);