const mongoose = require("mongoose");

const Occasion = require("../models/Occasion");

const PlanningGroup = require(
  "../models/PlanningGroup"
);

const PlanningGroupTemplate =
  require(
    "../models/PlanningGroupTemplate"
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

const generateGroupsFromTemplates =
  async (
    userId,
    data
  ) => {

    const {
      occasionId,
      templateIds,
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

    // Validate template selection
    if (
      !templateIds ||
      templateIds.length === 0
    ) {
      throw new Error(
        "No templates selected"
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

    // Fetch templates
    const templates =
      await PlanningGroupTemplate.find({
        _id: {
          $in: templateIds,
        },
        active: true,
      });

    if (templates.length === 0) {
      throw new Error(
        "Templates not found"
      );
    }

    // Prevent duplicate groups
    const existingGroups =
      await PlanningGroup.find({
        occasionId,
      });

    const existingTitles =
      existingGroups.map(
        (group) => group.title
      );

    const filteredTemplates =
      templates.filter(
        (template) =>
          !existingTitles.includes(
            template.title
          )
      );

    // Generate groups
    const groups =
      filteredTemplates.map(
        (template, index) => ({
          occasionId,
          title: template.title,
          icon: template.icon,
          color: template.color,
          order: index,
          isDefault: true,
        })
      );

    // Insert groups
    return await PlanningGroup.insertMany(
      groups
    );
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
  generateGroupsFromTemplates,
};