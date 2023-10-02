const mongoose = require('mongoose')
 
const db = "mongodb+srv://Dhairya:Dhairya432r@cluster0.kad7z2w.mongodb.net/mongo1?retryWrites=true&w=majority"
mongoose.connect(db)
.then(()=>{console.log("db connected")})
.catch(err=>{console.log(err)})