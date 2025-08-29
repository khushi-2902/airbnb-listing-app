const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");


const MONGO_URL="mongodb://127.0.0.1:27017/wander-lust";

main().then(()=>
{
  console.log("connect to DB");
})
.catch((err)=>
{
    console.log(err);
});
async function main()
{
    await mongoose.connect(MONGO_URL);
}


const initDB=async()=>
{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'68b096df5b695c00844cad4d'}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}
initDB();


// async function updateImage() {
//   await Listing.updateOne(
//     { title: "Cozy Beachfront Cottage" }, // filter
//     { $set: { "image.url": "https://images.unsplash.com/photo-1582610116397-edb318620f90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" } } // new link
//   );
//   console.log("Image updated successfully");
//   mongoose.connection.close();
// }

// updateImage();


