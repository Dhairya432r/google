// import React, { useState, useEffect } from 'react';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// function App() {
//     const [user, setUser] = useState([]);
//     const [profile, setProfile] = useState([]);

//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => setUser(codeResponse),
//         onError: (error) => console.log('Login Failed:', error)
//     });

//     useEffect(() => {
//         if (user) {
//             axios
//                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                     headers: {
//                         Authorization: `Bearer ${user.access_token}`,
//                         Accept: 'application/json'
//                     }
//                 })
//                 .then((res) => {
//                     setProfile(res.data);

//                     // Send user data to the backend API using Axios POST request
//                     const userData = {
//                         name: res.data.name,
//                         email: res.data.email,
//                         picture:res.data.picture
//                     };

//                     axios.post('http://localhost:5000/api/user', userData) // Replace '/api/user' with your backend endpoint
//                         .then(response => {
//                             console.log('User data sent successfully:', response.data);
//                         })
//                         .catch(error => {
//                             console.error('Error sending user data:', error);
//                         });
//                 })
//                 .catch((err) => console.log(err));
//         }
//     }, [user]);

//     const logOut = () => {
//         googleLogout();
//         setUser(null);
//         setProfile(null);
//     };

//     return (
        
//         <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             {profile ? (
//                 <div>
//                     <img src={profile.picture} alt="user image" />
//                     <h3>User Logged in</h3>
//                     <p>Name: {profile.name}</p>
//                     <p>Email Address: {profile.email}</p>
//                     <br />
//                     <br />
//                     <button onClick={logOut}>Log out</button>
//                 </div>
//             ) : (
//                 <button onClick={() => login()}>Sign in with Google 🚀 </button>
//             )}
//         </div>
//     );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import NavBar from './NavBar';
function App() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            setProfile(codeResponse.profileObj);
            sendUserDataToAPI(codeResponse.profileObj);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const sendUserDataToAPI = (userData) => {
        // Send user data to the backend API using Axios POST request
        axios.post('http://localhost:5000/api/user', userData)
            .then(response => {
                console.log('User data sent successfully:', response.data);
            })
            .catch(error => {
                console.error('Error sending user data:', error);
            });
    };

    const logOut = () => {
        googleLogout();
        setUser(null);
        setProfile(null);
    };

    return (
        <div>
            <NavBar/>
            <h2>React Google Login</h2>
            <br />
            <br />
            {user ? (
                <div>
                    <img src="#" alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: </p>
                    <p>Email Address:</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
        
    );
}

export default App;

