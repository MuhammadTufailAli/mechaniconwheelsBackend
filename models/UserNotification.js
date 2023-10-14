const mongoose = require("mongoose");

const UserNotificationSchema = new mongoose.Schema(
  {
    refOfUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Warning  must have user Id"],
    },
    adminName: {
      type: String,
    },
    adminPhotoUrl: {
      type: String,
    },
    warning: {
      type: String,
      required: [true, "There should be a warning message"],
    },
  },
  { timestamps: true }
);

const UserNotification = mongoose.model(
  "UserNotification",
  UserNotificationSchema
); // it will create a collection with productSchema
module.exports = UserNotification;
