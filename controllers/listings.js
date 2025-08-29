const Listing=require("../models/listing")


module.exports.index=async (req,res)=>
{
    let allListings=await Listing.find({})
    res.render("listings/index.ejs",{allListings});
}


module.exports.renderNewForm=(req,res)=>
{
  

    res.render("listings/newForm.ejs");
}

module.exports.showListing=async (req,res)=>
{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
        path:"author"
        }
       })
       .populate("owner");
    if(!listing)
    {
        req.flash("error","Listing you requested for doesn't exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}

module.exports.postListing=async (req,res)=>
{
    let url=req.file.path;
    let filename=req.file.filename;
     const newListing=new Listing(req.body.listing);
     newListing.owner=req.user._id;
     newListing.image={url,filename};
   await newListing.save();
   req.flash("success","New Listing Created");
   res.redirect("/listings");
    
    
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for doesn't exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = null;
    if (listing.image && listing.image.url) {
        originalImageUrl = listing.image.url.replace("/upload", "/upload/,w_250");
    }

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    // Find the listing first
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for doesn't exist!");
        return res.redirect("/listings");
    }

    // Manually update each field except image
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    // Add other fields as per your schema

    // Update image only if a new file is uploaded
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    // Save the updated listing
    await listing.save();

    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${id}`);
};
 

module.exports.destroyListing=async (req,res)=>
{
    
    let {id}=req.params;
    let listing=await Listing.findById(id);

    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");

}