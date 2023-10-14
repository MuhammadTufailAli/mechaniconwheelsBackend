const mongoose = require("mongoose");

const MechanicAfterAcceptingNotification = new mongoose.Schema({
  // we will use referincing here to get product

  refOfCustomer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Order must belong to a Customer"],
  },
  refOfMechanic: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  refOfCustomerNotification: {
    type: mongoose.Schema.ObjectId,
    ref: "CustomerMechanicAfterAcceptingNotification",
    required: [true, "Order must belong to a CustomerBuyingNotification"],
  },

  price: {
    type: Number,
    require: [true, "There must be a price. "],
  },
  latitude: {
    type: Number,
    require: [true, "There must be a latitude. "],
  },
  longitude: {
    type: Number,
    require: [true, "There must be a longitude. "],
  },

  Description: {
    type: String,
    require: [true, "There must be a description"],
  },
  Location: {
    type: String,
    require: [true, "There must be a Location"],
  },
  status: {
    type: String,
    require: [true, "Order must have a payment method "],
    default: "Pending",
  },
  createdAt: {
    type: Number,
  },
});

MechanicAfterAcceptingNotification.pre(/^find/, function (next) {
  this.populate({
    path: "refOfCustomer",
  });
  this.populate({
    path: "refOfMechanic",
  });

  next();
});

const mechanicAfterAcceptingNotification = mongoose.model(
  "MechanicAfterAcceptingNotification",
  MechanicAfterAcceptingNotification
);

module.exports = mechanicAfterAcceptingNotification;
