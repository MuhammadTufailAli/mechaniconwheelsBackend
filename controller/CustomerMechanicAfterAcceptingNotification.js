const CustomerMechanicAfterAcceptingNotification = require("./../models/CustomerMechanicAfterAcceptingNotification");
const factory = require("./handlerFactory");

exports.postNotification = factory.createOne(
  CustomerMechanicAfterAcceptingNotification
);

exports.updateNotification = factory.updateOne(
  CustomerMechanicAfterAcceptingNotification
);

exports.deleteNotification = factory.deleteOne(
  CustomerMechanicAfterAcceptingNotification
);

exports.getSingleNotification = factory.getOne(
  CustomerMechanicAfterAcceptingNotification,
  {
    path: "User",
  }
);

exports.getNotification = async (req, res, next) => {
  try {
    const Notification = await CustomerMechanicAfterAcceptingNotification.find({
      refOfCustomer: req.params.id,
    }).populate({
      path: "User",
    });
    res.status(200).json({
      status: "success",
      result: Notification.length,
      data: Notification,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
