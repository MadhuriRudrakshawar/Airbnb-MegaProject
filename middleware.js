const Listing =  require("./models/listing");


module.exports.isLoggedIn = (req, res, next) =>{

if(!req.isAuthenticated()){
  req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create listing");
   return res.redirect("/login");
  }
  next();
}


module.exports.saveRedirectUrl = (req, res, next) =>{

  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// module.exports.isOnwer = async (req, res, next) =>{

//   let { id } = req.params;
//   let listing = Listing.findById(id);
//   if(!listing.owner.equals(res.locals.currUser._id)){
//     req.flash("error", "You are not owner of the listing.");
//   return   res.redirect(`/listing/${id}`);
//   }
// next();
// }