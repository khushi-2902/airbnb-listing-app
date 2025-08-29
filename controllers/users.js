const Listing=require("../models/user")
const User = require("../models/user");


module.exports.renderSignupForm=(req,res)=>
{
    res.render("user/signup.ejs");
}





module.exports.signup=async(req,res)=>
{
    try
    {
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser= await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>
    {
        if(err)
        {
            return next(err);
        }
     req.flash("success","Welcome to WanderLust!");
     res.redirect("/listings");
    })
 
    }
    catch(e)
    {
        req.flash("error","Enter Username is already registered");
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm=(req,res)=>
{
    res.render("user/login.ejs");
}


module.exports.login=(req,res)=>
{
    req.flash("success","Welcome Back!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    
}


module.exports.logout=(req,res,next)=>
{
    req.logout((err)=>
    {
        if(err)
        {
            return next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/listings");
    })
}