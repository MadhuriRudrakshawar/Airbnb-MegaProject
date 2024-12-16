const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const { isLoggedIn, isOnwer } = require("../middleware");
const listingController = require("../controllers/listings");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router
.route("/")
.get( wrapAsync(listingController.index))
.post( isLoggedIn, validateListing,  wrapAsync(listingController.createListing));

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingController.showListings))
.put( isLoggedIn, validateListing,  wrapAsync(listingController.updateListing))
.delete( isLoggedIn,  wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm));


module.exports = router;
