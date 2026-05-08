const groupService = require(
  "../services/groupService"
);

const createGroup = async (
  req,
  res
) => {
  try {
    const group =
      await groupService.createGroup(
        req.user._id,
        req.body
      );

    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getOccasionGroups =
  async (req, res) => {
    try {
      const groups =
        await groupService.getOccasionGroups(
          req.user._id,
          req.params.occasionId
        );

      res.status(200).json(groups);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

module.exports = {
  createGroup,
  getOccasionGroups,
};