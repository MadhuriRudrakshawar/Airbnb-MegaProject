const express =require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

main()
.then (() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.log(err);
});


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}  

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res)=>{
    res.send("Hi, I am root");
});

//index route
app.get("/listings", async (req,res)=> {
  const allListings = await Listing.find({});
  console.log(allListings);
  res.render("./listings/index.ejs", {allListings});
});

//view route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id", async (req, res)=> {
   let {id} =  req.params;
   const listing = await Listing.findById(id);
   res.render("listings/show.ejs", {listing} );
});

//create route
app.post("/listings", async (req, res)=>{
   const newListing = new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit", async (req,res) =>{
    let {id} =  req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
 
});

//update route
app.put("/listings/:id", async (req, res)=> {

    let { id } = req.params;
   await Listing.findByIdAndUpdate(id, { ...req.body.listening});
   res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id", async (req, res)=> {
    let {id} = req.params;
    let deleteListings = await Listing.findByIdAndDelete(id);
    console.log(deleteListings);
    res.redirect("/listings");
});













// app.get("/testListing", async (req, res) =>{
//     let sampleListing =new Listing({
//         title: "Cliffs of Moher",
//         description: "Natural wonder",
//         price: 300,
//         location: "Limerick",
//         country: "Ireland",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful testing");
// });

app.listen(8080, ()=> {
    console.log("Server is listening to port 8080");
});