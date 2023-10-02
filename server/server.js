// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const cors = require('cors');
// const jwt = require('jsonwebtoken')
// const User = require('./model/schema') 
// const authenticate = require("./middleware/authenticate");
// mongoose.connect('mongodb+srv://Dhairya:Dhairya432r@cluster0.kad7z2w.mongodb.net/mongo2?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(()=>{
//     console.log(`successfully connected to db`)
// }).catch((err)=> console.log(`failed to connect db`));

// // const User = mongoose.model('User', {
// //     name: String,
// //     email: String,
// //     picture: String

// // });





// app.use(cors());
// app.use(express.json());

// app.post('/api/user', async (req, res) => {
//     const { name, email,picture } = req.body;
//     const token = jwt.sign({ email }, 'MYNAMEISDHAIRYA', { expiresIn: '1h' }); // Generate JWT token
//     const user = new User({ name, email,picture,token });
//     try {
//         await user.save();
//         res.status(201).json({ message: 'User data saved successfully',token });
//         ;
//     } catch (error) {
//         res.status(500).json({ error: 'Error saving user data' });
//     }

// });


// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./model/schema') 
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
mongoose.connect('mongodb+srv://Dhairya:Dhairya432r@cluster0.kad7z2w.mongodb.net/mongo2?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`successfully connected to db`)
}).catch((err) => console.log(`failed to connect db`));



app.use(cors());
app.use(express.json());

app.post('/api/user', async (req, res) => {
    const { name, email, picture } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            // If the user doesn't exist, create a new user with an initial token
            const token = jwt.sign({ email },'MYNAMEISDHAIRYA' , { expiresIn: '1h' });
            user = new User({ name, email, picture, tokens: [token] });
            await user.save();
        } else {
            // If the user already exists, add a new token to the tokens array
            const token = jwt.sign({ email },'MYNAMEISDHAIRYA', { expiresIn: '1h' });
            user.tokens.push(token);
            await user.save();
        }

        res.status(201).json({ message: 'User data saved successfully', tokens: user.tokens });
    } catch (error) {
        res.status(500).json({ error: 'Error saving user data' });
    }
});

//heroku
if(process.env.NODE_ENV == "production") {
app.use(express.static("google/build"));    
}


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

