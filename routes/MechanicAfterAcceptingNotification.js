var express = require("express");
var router = express.Router();

const notificationController = require("../controller/MechanicAfterAcceptingNotification");

router.get("/getNotification/:id", notificationController.getNotification);

// router.get(
//   "/getNotification/:id",
//   notificationController.getSingleNotification
// );

router.post("/PostNotification", notificationController.postNotification);
router.patch(
  "/updateNotification/:id",
  notificationController.updateNotification
);

router.patch(
  "/updateNotificationToReached/:id",
  notificationController.updateNotificationToReached
);

router.delete(
  "/deleteNotification/:id",
  notificationController.deleteNotification
);

module.exports = router;
