const Listing = require("../models/listing");




module.exports.index =async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
  }


  module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");}


    module.exports.showListings = async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id)
          .populate("reviews")
          .populate("owner");
        if (!listing) {
          req.flash("error", "Listing you requested for does not exist!");
          res.redirect("/listings");
        }
        console.log(listing);
        res.render("listings/show.ejs", { listing });
      }


      module.exports.createListing = async (req, res, next) => {
          const newListing = new Listing(req.body.listing);
          console.log(req.user);
          newListing.owner = req.user._id;
          await newListing.save();
          req.flash("success", "New listing created!");
          res.redirect("/listings");
        }

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }


  module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listening });
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
  }

  module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deleteListings = await Listing.findByIdAndDelete(id);
    console.log(deleteListings);
    req.flash("success", "Listing deleted!");

    res.redirect("/listings");
  }