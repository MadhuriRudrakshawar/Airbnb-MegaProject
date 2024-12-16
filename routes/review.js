const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const { reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const Listing = require("../models/listing");
const reviewController = require("../controllers/reviews");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//reviews
//post review route
router.post("/", validateReview, wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId", wrapAsync(reviewController.destroyReview));

module.exports = router;
