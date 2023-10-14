const notification = require("./../models/UserNotification");
const factory = require("./handlerFactory");

exports.postNotification = async (req, res, next) => {
  try {
    const AddNotification = await notification.create(req.body);
    res.status(201).json({
      status: "success",

      data: {
        AddNotification,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.UserNotification = async (req, res, next) => {
  try {
    const userNotification = await notification.find({
      refOfUser: req.params.id,
    });

    res.status(200).json({
      status: "success",
      result: userNotification.length,
      data: userNotification,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
