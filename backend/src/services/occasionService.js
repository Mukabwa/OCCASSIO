const mongoose = require("mongoose");

const Occasion = require(
  "../models/Occasion"
);

const createOccasion = async (
  userId,
  data
) => {
  const {
    title,
    type,
    date,
    location,
    notes,
  } = data;

  if (!title || !date) {
    throw new Error(
      "Title and date are required"
    );
  }

  const occasion =
    await Occasion.create({
      userId,
      title,
      type,
      date,
      location,
      notes,
    });

  return occasion;
};

const getOccasions = async (
  userId
) => {
  return await Occasion.find({
    userId,
  }).sort({
    date: 1,
  });
};

const getOccasionById = async (
  userId,
  occasionId
) => {

  // ADD THIS
  if (
    !mongoose.Types.ObjectId.isValid(
      occasionId
    )
  ) {
    throw new Error(
      "Invalid occasion ID"
    );
  }

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

  return occasion;
};

module.exports = {
  createOccasion,
  getOccasions,
  getOccasionById,
};