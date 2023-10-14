const Review = require("./../models/reviewMechanic");
const factory = require("./handlerFactory");

exports.getReviews = factory.getAll(Review);
exports.getsingleReview = factory.getOne(Review);
exports.postReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.getproductReview = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const productReview = await Review.find({ refOfMechanic: req.params.id });
    // console.log(productReview);
    res.status(200).json({
      status: "success",
      result: productReview.length,
      data: productReview,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
