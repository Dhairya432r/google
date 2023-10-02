// const express = require('express');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const router = express.Router();

// // Initialize Passport
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: 'YOUR_GOOGLE_CLIENT_ID',
//       clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
//       callbackURL: '/auth/google/callback',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // You can save user data to MongoDB here
//       return done(null, profile);
//     }
//   )
// );

// // Serialize and Deserialize User
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Google Sign-In Route
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Google Callback Route
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, redirect to the frontend or send a response
//     res.redirect('/'); // You can customize the redirect URL
//   }
// );

// module.exports = router;
