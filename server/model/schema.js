const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  tokens: [String] // Add an array field to store JWT tokens
});

const User = mongoose.model('User', userSchema);
module.exports=User



















// const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken');

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true
// },
// email: {
//     type: String,
//     required: true
// },
//   picture:  {
//     type: String,
//     required: true
// },
// tokens:[
//   {
//       token:{
//           type:String,
          
//       }
//   }
// ]
// })


//   //generate token


// module.exports = User;