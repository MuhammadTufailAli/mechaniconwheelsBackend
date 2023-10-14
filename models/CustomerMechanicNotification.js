const mongoose = require("mongoose");

const CustomerMechanicNotification = new mongoose.Schema({
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
  RejectedByUser: {
    type: Array,
    default: [],
  },
  AcceptedByUser: [
    {
      refOfMechanic: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
  ],
  createdAt: {
    type: Number,
  },
});

CustomerMechanicNotification.pre(/^find/, function (next) {
  this.populate({
    path: "refOfCustomer",
  });
  this.populate({
    path: "refOfMechanic",
  });

  next();
});

const customerMechanicNotification = mongoose.model(
  "CustomerMechanicNotification",
  CustomerMechanicNotification
);

module.exports = customerMechanicNotification;
