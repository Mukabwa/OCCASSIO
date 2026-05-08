const occasionService = require(
  "../services/occasionService"
);

const createOccasion = async (
  req,
  res
) => {
  try {
    const occasion =
      await occasionService.createOccasion(
        req.user._id,
        req.body
      );

    res.status(201).json(
      occasion
    );
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getOccasions = async (
  req,
  res
) => {
  try {
    const occasions =
      await occasionService.getOccasions(
        req.user._id
      );

    res.status(200).json(
      occasions
    );
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getOccasionById =
  async (req, res) => {
    try {
      const occasion =
        await occasionService.getOccasionById(
          req.user._id,
          req.params.id
        );

      res.status(200).json(
        occasion
      );
    } catch (error) {
      res.status(404).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  createOccasion,
  getOccasions,
  getOccasionById,
};