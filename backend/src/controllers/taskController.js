const taskService = require(
  "../services/taskService"
);

const createTask = async (
  req,
  res
) => {
  try {
    const task =
      await taskService.createTask(
        req.user._id,
        req.body
      );

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getGroupTasks = async (
  req,
  res
) => {
  try {
    const tasks =
      await taskService.getGroupTasks(
        req.user._id,
        req.params.groupId
      );

    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getGroupTasks,
};