const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrappAsync=require("../utils/wrappAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js")
const multer=require("multer");
const{storage}=require("../cloudConfig.js");
const upload=multer({storage})

router.route("/")
 .get(wrappAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'),wrappAsync(listingController.postListing))


//newRoute
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get(wrappAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrappAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrappAsync(listingController.destroyListing))
  







router.get("/:id/edit", isLoggedIn, isOwner, wrappAsync(listingController.renderEditForm));






// app.all("*",(req,res,next)=>
// {
//    next(new ExpressError(404,"Page not found"));
// })

module.exports=router;
