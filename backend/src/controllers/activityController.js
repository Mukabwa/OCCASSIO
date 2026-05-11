const activityService = require(
  "../services/activityService"
);

const createActivity = async (
  req,
  res
) => {
  try {
    const activity =
      await activityService.createActivity(
        req.user._id,
        req.body
      );

    res.status(201).json(
      activity
    );
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getTaskActivities =
  async (req, res) => {
    try {
      const activities =
        await activityService.getTaskActivities(
          req.user._id,
          req.params.taskId
        );

      res.status(200).json(
        activities
      );
    } catch (error) {
      res.status(400).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  createActivity,
  getTaskActivities,
};