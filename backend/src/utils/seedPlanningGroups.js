const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = require(
  "../config/db"
);

const PlanningGroupTemplate =
  require(
    "../models/PlanningGroupTemplate"
  );

const templates = [
  {
    title: "Venue",
    icon: "building",
    color: "#A78BFA",
  },
  {
    title: "Catering",
    icon: "utensils",
    color: "#F59E0B",
  },
  {
    title: "Photography",
    icon: "camera",
    color: "#3B82F6",
  },
  {
    title: "Decor",
    icon: "sparkles",
    color: "#EC4899",
  },
  {
    title: "Guests",
    icon: "users",
    color: "#10B981",
  },
  {
    title: "Entertainment",
    icon: "music",
    color: "#EF4444",
  },
];

const seedTemplates =
  async () => {
    try {
      await connectDB();

      await PlanningGroupTemplate.deleteMany();

      await PlanningGroupTemplate.insertMany(
        templates
      );

      console.log(
        "Planning group templates seeded"
      );

      process.exit();
    } catch (error) {
      console.error(error);

      process.exit(1);
    }
  };

seedTemplates();