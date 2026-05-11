const PlanningGroupTemplate =
  require(
    "../models/PlanningGroupTemplate"
  );

const getTemplates =
  async () => {
    return await PlanningGroupTemplate.find({
      active: true,
    }).sort({
      title: 1,
    });
  };

module.exports = {
  getTemplates,
};