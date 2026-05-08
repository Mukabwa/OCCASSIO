const mongoose = require("mongoose");

const Occasion = require("../models/Occasion");

const PlanningGroup = require(
  "../models/PlanningGroup"
);

const createGroup = async (
  userId,
  data
) => {
  const {
    occasionId,
    title,
    icon,
    color,
  } = data;

  // Validate occasion ID
  if (
    !mongoose.Types.ObjectId.isValid(
      occasionId
    )
  ) {
    throw new Error(
      "Invalid occasion ID"
    );
  }

  // Verify ownership
  const occasion =
    await Occasion.findOne({
      _id: occasionId,
      userId,
    });

  if (!occasion) {
    throw new Error(
      "Occasion not found"
    );
  }

  // Validate title
  if (!title) {
    throw new Error(
      "Group title required"
    );
  }

  // Create planning group
  const group =
    await PlanningGroup.create({
      occasionId,
      title,
      icon,
      color,
    });

  return group;
};

const getOccasionGroups =
  async (
    userId,
    occasionId
  ) => {

    // Validate occasion ID
    if (
      !mongoose.Types.ObjectId.isValid(
        occasionId
      )
    ) {
      throw new Error(
        "Invalid occasion ID"
      );
    }

    // Verify ownership
    const occasion =
      await Occasion.findOne({
        _id: occasionId,
        userId,
      });

    if (!occasion) {
      throw new Error(
        "Occasion not found"
      );
    }

    // Fetch groups
    return await PlanningGroup.find({
      occasionId,
    }).sort({
      order: 1,
      createdAt: 1,
    });
  };

module.exports = {
  createGroup,
  getOccasionGroups,
};