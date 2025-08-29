const express=require("express");
const router=express.Router({mergeParams:true});
const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");
const wrappAsync=require("../utils/wrappAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const listingController=require("../controllers/reviews.js")
  
  //Review -postRoute
router.post("/",isLoggedIn,validateReview, wrappAsync(listingController.createReview));

//Review-Delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrappAsync(listingController.destroyReview));


module.exports=router;


