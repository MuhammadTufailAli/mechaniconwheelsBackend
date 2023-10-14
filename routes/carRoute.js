var express = require("express");
var router = express.Router();

const carcontroller = require("../controller/carcontroller");

router.route("/addcar").post(carcontroller.addcar);

router.route("/getcar").get(carcontroller.getcar);
router.route("/deleteCar/:id").delete(carcontroller.deletecar);
router.route("/updateCar/:id").patch(carcontroller.updatecar);

router.route("/CustomerVehicle/:id").get(
  // loginController.protect,
  // loginController.restrictTo('shopOwner', 'admin'),
  carcontroller.CustomerVehicle
);

module.exports = router;
