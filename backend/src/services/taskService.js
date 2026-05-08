const mongoose = require("mongoose");

const Task = require(
  "../models/Task"
);

const PlanningGroup = require(
  "../models/PlanningGroup"
);

const Occasion = require(
  "../models/Occasion"
);

const createTask = async (
  userId,
  data
) => {
  const {
    title,
    notes,
    dueDate,
    planningGroupId,
  } = data;

  if (!title) {
    throw new Error(
      "Task title required"
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(
      planningGroupId
    )
  ) {
    throw new Error(
      "Invalid group ID"
    );
  }

  // Find group
  const group =
    await PlanningGroup.findById(
      planningGroupId
    );

  if (!group) {
    throw new Error(
      "Planning group not found"
    );
  }

  // Find occasion
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

  const task = await Task.create({
    title,
    notes,
    dueDate,
    planningGroupId,
  });

  return task;
};

const getGroupTasks = async (
  userId,
  groupId
) => {

  if (
    !mongoose.Types.ObjectId.isValid(
      groupId
    )
  ) {
    throw new Error(
      "Invalid group ID"
    );
  }

  // Find group
  const group =
    await PlanningGroup.findById(
      groupId
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

  return await Task.find({
    planningGroupId: groupId,
  }).sort({
    order: 1,
    createdAt: 1,
  });
};

module.exports = {
  createTask,
  getGroupTasks,
};