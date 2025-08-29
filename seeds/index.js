require("dotenv").config({ path: "../.env" });

console.log("ATLASDB_URL is:", process.env.ATLASDB_URL);




const mongoose = require("mongoose");
const Listing = require("../models/listing"); // adjust path if needed
const { data: sampleListings } = require("../init/data"); // corrected path
// replace with your Atlas DB URL
const dbUrl=process.env.ATLASDB_URL;
console.log("dbUrl is:", dbUrl);



mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });

const seedDB = async () => {
  try {
    await Listing.deleteMany({}); // clear old data
    await Listing.insertMany(sampleListings); // insert new sample data
    console.log("🌱 Sample data inserted successfully!");
  } catch (err) {
    console.log(" Error inserting data:", err);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
