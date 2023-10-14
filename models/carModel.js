const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  refOfUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Product must belong to a Shop Owner"],
  },
  Engine_Type: {
    type: String,
    require: true,
  },
  City: {
    type: String,
    require: true,
  },
  Capacity: {
    type: String,
    require: true,
  },
  Transmission: {
    type: String,
    require: true,
  },

  Color: {
    type: String,
    require: true,
  },

  Assembly: {
    type: String,
    require: true,
  },

  Body_Type: {
    type: String,
    require: true,
  },
  Mileage: {
    type: String,
    require: true,
  },
  Model_Year: {
    type: String,
    require: true,
  },
  Username: {
    type: String,
    require: true,
  },
  User_Contact: {
    type: Number,
    require: true,
  },
  Price: {
    type: String,
    require: true,
  },
  Features: {
    type: [String],
    require: true,
  },
  imageUrl: {
    type: [String],
    required: [true, "Product must have a image"],
  },
});

const Car = mongoose.model("Car", CarSchema);
module.exports = Car;
