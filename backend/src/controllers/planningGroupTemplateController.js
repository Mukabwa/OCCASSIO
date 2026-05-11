const planningGroupTemplateService =
  require(
    "../services/planningGroupTemplateService"
  );

const getTemplates =
  async (req, res) => {
    try {
      const templates =
        await planningGroupTemplateService.getTemplates();

      res.status(200).json(
        templates
      );
    } catch (error) {
      res.status(400).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getTemplates,
};