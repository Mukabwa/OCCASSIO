const mongoose = require("mongoose");

const Activity = require("../models/Activity");
const Task = require("../models/Task");
const PlanningGroup = require("../models/PlanningGroup");
const Occasion = require("../models/Occasion");

const createActivity = async (
  userId,
  data
) => {
  const {
    taskId,
    title,
    dateTime,
    location,
    notes,
  } = data;

  // Validate required fields
  if (!title || !dateTime) {
    throw new Error(
      "Title and date/time are required"
    );
  }

  // Validate task ID
  if (
    !mongoose.Types.ObjectId.isValid(
      taskId
    )
  ) {
    throw new Error(
      "Invalid task ID"
    );
  }

  // Find task
  const task =
    await Task.findById(taskId);

  if (!task) {
    throw new Error(
      "Task not found"
    );
  }

  // Find planning group
  const group =
    await PlanningGroup.findById(
      task.planningGroupId
    );

  if (!group) {
    throw new Error(
      "Planning group not found"
    );
  }

  // Verify ownership through occasion
  const occasion =
    await Occasion.findOne({
      _id: group.occasionId,
      userId,
    });

  if (!occasion) {
    throw new Error(
      "Unauthorized access"
    );
  }

  // Create activity
  const activity =
    await Activity.create({
      taskId,
      title,
      dateTime,
      location,
      notes,
    });

  return activity;
};

const getTaskActivities =
  async (userId, taskId) => {

    // Validate task ID
    if (
      !mongoose.Types.ObjectId.isValid(
        taskId
      )
    ) {
      throw new Error(
        "Invalid task ID"
      );
    }

    // Find task
    const task =
      await Task.findById(taskId);

    if (!task) {
      throw new Error(
        "Task not found"
      );
    }

    // Find planning group
    const group =
      await PlanningGroup.findById(
        task.planningGroupId
      );

    if (!group) {
      throw new Error(
        "Planning group not found"
      );
    }

    // Verify ownership
    const occasion =
      await Occasion.findOne({
        _id: group.occasionId,
        userId,
      });

    if (!occasion) {
      throw new Error(
        "Unauthorized access"
      );
    }

    // Fetch activities
    return await Activity.find({
      taskId,
    }).sort({
      dateTime: 1,
      createdAt: 1,
    });
  };

module.exports = {
  createActivity,
  getTaskActivities,
};