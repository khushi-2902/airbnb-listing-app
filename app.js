if(process.env.NODE_ENV!="production")
{
   require("dotenv").config();
}


require("dotenv").config();
console.log(process.env.SECRET);


const express=require("express");
const app=express();
const mongoose=require("mongoose");


const dbUrl=process.env.ATLASDB_URL;


const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
 
const listings=require("./routes/listing.js"); 
const reviews=require("./routes/reviews.js"); 
const user=require("./routes/user.js"); 

const MongoStore=require("connect-mongo");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const User=require("./models/user.js");
app.use(express.static("public"));



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
    await mongoose.connect(dbUrl);
}
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use((express.urlencoded({extended:true})));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:
  {
    secret:process.env.SECRET,
  },
  touchAfter:24 * 3600,
})


store.on("error",()=>
{
  console.log("ERROR IN MONGO SESSION STORE",err);
})




const sessionOptions={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:
  {
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },

};









app.use(session(sessionOptions));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// app.get("/",(req,res)=>
// {
//   res.send("hi i am root");
// })




app.get("/", (req, res) => {
    res.send("Welcome to TravelNest 🚀");
    // or redirect to listings
    // res.redirect("/listings");
});

  
app.use((req,res,next)=>
{
     res.locals.success=req.flash("success");
     res.locals.error=req.flash("error");
     res.locals.currUser=req.user; 
     next();
})

app.get('/demouser',async(req,res)=>
{
   let fakeUser=new User({
     email:"student@gmail.com",
     username:"delta-student",
   });
   let registerUser=await User.register(fakeUser,"helloWorld");
   res.send(registerUser);
})





  app.use("/listings",listings);

  app.use("/listings/:id/reviews",reviews);
  app.use("/",user);

// app.get("/testListing",async (req,res)=>
// {
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the Beach",
//         price:200000,
//         location:"Goa",
//         country:"India",


//     });



//     await sampleListing.save();
//     console.log("response was saved");
//     res.send("successfully saved");
// })


// app.get("/getcookies",(req,res)=>
// {
//   res.cookie("HELLO","namaste");
//   res.send("Hi here are some cookies");
  
// })



//middleware
app.use((err,req,res,next)=>
{
   let{status=500,message="Something error"}=err;
   res.render("error.ejs",{message,status});
})







let port=1000;
app.listen(port,(req,res)=>
{
    console.log("port is listening on 1000");
    
})

