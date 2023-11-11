const router = require("express").Router();
const session = require("express-session");
const passport = require('passport');
const FacebookStrategy = require("passport-facebook").Strategy;
var info;
let kimmi;
// connect to facebook
router.use(session({
  saveUninitialized:true,
  secret:'SECRET'
}))
router.use(passport.initialize());
router.use(passport.session());
passport.use(new FacebookStrategy({
  clientID:"882795876258789",
  clientSecret:"bff74cea5dda14cb56b788acfbd50eab",
  callbackURL:"https://bmi-uchun.onrender.com/auth/facebook/callback",
  profileFields:['id','displayName','name','gender','picture.type(large)','email']
},
function(token,refreshToken,profile,done){
  kimmi = profile
  return done(null,profile)
}))

// get info in facebook's
router.get('/facebook',passport.authenticate('facebook',{scope:'email'}))
router.get('/facebook/callback',passport.authenticate('facebook',{
      successRedirect:'/auth/profile',
      failureRedirect:'/failed'
}))
router.get("/profile",(req,res)=>{
    res.json("success" + kimmi)
})
router.get("/failed",(req,res)=>{
    res.json("wrong")
})




passport.serializeUser(function(user,done){
  done(null,user)
  info=user._json
})
passport.deserializeUser(function(id,done){
  return done(null,id)
})

module.exports = router