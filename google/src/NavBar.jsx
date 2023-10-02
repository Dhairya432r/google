import React, { useState } from 'react';
import {Link} from'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import('preline')

function NavBar() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            setProfile(codeResponse.profileObj);
            sendUserDataToAPI(codeResponse.profileObj);
            alert(`login successfully`)
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
        alert(`logout successfully`)
    };
  
    const scrollToTop = () => {
      window.scrollTo(0, 0)
  }
  
    return (
        
        <div>
        {user ? (
        
        <header class="fixed flex  flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
        <nav class="max-w-[85rem] w-full mx-auto md:px-10 px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
          <div class="flex items-center justify-between">
            <img src='https://dm6g3jbka53hp.cloudfront.net/static-images/tpn-logo-v1.png' alt='' className='w-56 h-10 '/>
            <div class="sm:hidden">
              <button type="button" class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-collapse="#navbar-collapse-basic" aria-controls="navbar-collapse-basic" aria-label="Toggle navigation">
                <svg class="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <svg class="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
          </div>
      
          <div id="navbar-collapse-basic" class="hidden basis-full grow sm:block">
            <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
              <div class="font-medium text-blue-500" href="#" aria-current="page">Active</div>
      
              {/* <div class="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] [--auto-close:false]">
                <button id="hs-mega-menu-basic-dr" type="button" class="flex items-center w-full text-gray-600 hover:text-gray-400 font-medium dark:text-gray-400 dark:hover:text-gray-500 ">
                  Dropdown
                  <svg class="ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                  </svg>
                </button>
      
                <div class="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 bg-blue-200 sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:left-0 before:w-full before:h-5">
                  <div class="flex items-center gap-x-3.5 py-2 px-3  rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                    About
                  </div>
                  <div class="hs-dropdown relative [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] [--auto-close:false]">
                    <button type="button" class=" flex justify-between w-full items-center text-sm text-gray-800 rounded-md py-2 px-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                      Sub Menu
                      <svg class="sm:-rotate-90 ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                      </svg>
                    </button>
      
                    <div class="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-2 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute sm:border before:-right-5 before:top-0 before:h-full before:w-5 top-0 right-full !mx-[10px]">
                      <div class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                        About
                      </div>
                      <div class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                        Downloads
                      </div>
                      <div class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                        Team Account
                      </div>
                    </div>
                  </div>
      
                  <div class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                    Downloads
                  </div>
                  <div class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                    Team Account
                  </div>
                </div>
              </div> */}
      
              <div class="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] [--auto-close:false]">
                <button type="button" class="flex items-center  w-full text-gray-600 hover:text-gray-400 font-medium dark:text-gray-400 dark:hover:text-gray-500">
                  Home Services
                  <svg class="ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                  </svg>
                </button>
      
                <div class="hs-dropdown-menu  justify-center transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full lg:h-56 h-[550px] md:h-[200px] hidden z-10 top-full left-0 min-w-[15rem] bg-blue-200 sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute before:-top-5 before:left-0 before:w-full before:h-5">
                  <div class="sm:grid sm:grid-cols-3">
                    <div class="flex flex-col ">
                     
                       <Link to ='/Petgrooming'>
                       <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar1.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto " onClick={scrollToTop}>Pet Grooming</h1>
                     </div>
                      </div><br/>
                      </Link>
                      <Link to = '/Consult'>
                      <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar2.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>Consult a vet</h1>
                     </div>
                      </div><br/></Link>

                <Link to = '/Trainning'>
                      <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar3.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto"onClick={scrollToTop}>Dog Training</h1>
                     </div>
                      </div><br/></Link>
                    </div>
                    


                    <div class="flex flex-col">
                    <Link to = '/'>
                    <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar4.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>Pet Walking</h1>
                     </div>
                      </div><br/></Link>
                      <Link to = '/'>
                      <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar5.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>Pet Relocation</h1>
                     </div>
                      </div><br/></Link>
                      <Link to = '/Insurance'>
                      <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar6.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>Pet  Insurance</h1>
                     </div>
                      </div></Link>
                    </div>




                    <div class="flex flex-col">
                    <Link to = '/'>
                    <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar9.jpg' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>About Us</h1>
                     </div>
                      </div><br/></Link>
                    <Link to = '/Blogs'>
                    <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar8.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>Blog</h1>
                     </div>
                      </div><br/></Link>
                    
                    <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800  focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-5">
                       <Link to = '/'>
                       <img src="./assets/images/fb.png" onClick={scrollToTop} className='h-8 w-8 mt-4'/></Link>
                       <Link to = '/'>
                       <img src="./assets/images/insta.png" onClick={scrollToTop} className='h-8 w-8 ml-6 mt-4'/></Link>
                       <Link to = '/'>
                       <img src="./assets/images/youtube.png" onClick={scrollToTop} className='h-8 w-8 mt-4 ml-4 '/></Link>
                     </div>
                      </div><br/>
                      </div>
                  </div>
                  
                </div>
                
              </div>
              <button onClick={logOut}>Log out</button>
              
            </div>
          </div>
        </nav>
      </header>
      
      ) : (

        <header class="fixed flex  flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
        <nav class="max-w-[85rem] w-full mx-auto md:px-10 px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
          <div class="flex items-center justify-between">
            <img src='https://dm6g3jbka53hp.cloudfront.net/static-images/tpn-logo-v1.png' alt='' className='w-56 h-10 '/>
            <div class="sm:hidden">
              <button type="button" class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-collapse="#navbar-collapse-basic" aria-controls="navbar-collapse-basic" aria-label="Toggle navigation">
                <svg class="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <svg class="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
          </div>
      
          <div id="navbar-collapse-basic" class="hidden basis-full grow sm:block">
            <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
              <div class="font-medium text-blue-500" href="#" aria-current="page">Active</div>
      
              {/* <div class="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] [--auto-close:false]">
                <button id="hs-mega-menu-basic-dr" type="button" class="flex items-center w-full text-gray-600 hover:text-gray-400 font-medium dark:text-gray-400 dark:hover:text-gray-500 ">
                  Dropdown
                  <svg class="ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                  </svg>
                </button>
      
                <div class="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 bg-blue-200 sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:left-0 before:w-full before:h-5">
                  <div class="flex items-center gap-x-3.5 py-2 px-3  rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                    About
                  </div>
                  <div class="hs-dropdown relative [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] [--auto-close:false]">
                    <button type="button" class=" flex justify-between w-full items-center text-sm text-gray-800 rounded-md py-2 px-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                      Sub Menu
                      <svg class="sm:-rotate-90 ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                      </svg>
                    </button>
      
                    <div class="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-2 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute sm:border before:-right-5 before:top-0 before:h-full before:w-5 top-0 right-full !mx-[10px]">
                      <div class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                        About
                      </div>
                      <div class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                        Downloads
                      </div>
                      <div class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                        Team Account
                      </div>
                    </div>
                  </div>
      
                  <div class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                    Downloads
                  </div>
                  <div class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                    Team Account
                  </div>
                </div>
              </div> */}
      
              <div class="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] [--auto-close:false]">
                <button type="button" class="flex items-center  w-full text-gray-600 hover:text-gray-400 font-medium dark:text-gray-400 dark:hover:text-gray-500">
                  Home Services
                  <svg class="ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                  </svg>
                </button>
      
                <div class="hs-dropdown-menu  justify-center transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full lg:h-56 h-[550px] md:h-[200px] hidden z-10 top-full left-0 min-w-[15rem] bg-blue-200 sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute before:-top-5 before:left-0 before:w-full before:h-5">
                  <div class="sm:grid sm:grid-cols-3">
                    <div class="flex flex-col ">
                     
                       <Link to ='/Petgrooming'>
                       <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar1.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto " onClick={scrollToTop}>Pet Grooming</h1>
                     </div>
                      </div><br/>
                      </Link>
                      <Link to = '/Consult'>
                      <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar2.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>Consult a vet</h1>
                     </div>
                      </div><br/></Link>

                <Link to = '/Trainning'>
                      <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar3.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto"onClick={scrollToTop}>Dog Training</h1>
                     </div>
                      </div><br/></Link>
                    </div>
                    


                    <div class="flex flex-col">
                    <Link to = '/'>
                    <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar4.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>Pet Walking</h1>
                     </div>
                      </div><br/></Link>
                      <Link to = '/'>
                      <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar5.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>Pet Relocation</h1>
                     </div>
                      </div><br/></Link>
                      <Link to = '/Insurance'>
                      <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar6.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>Pet  Insurance</h1>
                     </div>
                      </div></Link>
                    </div>




                    <div class="flex flex-col">
                    <Link to = '/'>
                    <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar9.jpg' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>About Us</h1>
                     </div>
                      </div><br/></Link>
                    <Link to = '/Blogs'>
                    <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-2">
                       <img src='./assets/images/NavBar8.png' className='w-10 relative h-10'/>
                     <h1 className="font-semibold my-auto" onClick={scrollToTop}>Blog</h1>
                     </div>
                      </div><br/></Link>
                    
                    <div class=" text-center   py-0 px-3 rounded-md  text-sm lg:text-2xl text-gray-800  focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                       <div className="flex justify-center space-x-5">
                       <Link to = '/'>
                       <img src="./assets/images/fb.png" onClick={scrollToTop} className='h-8 w-8 mt-4'/></Link>
                       <Link to = '/'>
                       <img src="./assets/images/insta.png" onClick={scrollToTop} className='h-8 w-8 ml-6 mt-4'/></Link>
                       <Link to = '/'>
                       <img src="./assets/images/youtube.png" onClick={scrollToTop} className='h-8 w-8 mt-4 ml-4 '/></Link>
                     </div>
                      </div><br/>
                      </div>
                  </div>
                  
                </div>
                
                
              </div>
              <button onClick={() => login()}>Sign in with Google 🚀 </button>
              
            </div>
          </div>
        </nav>
      </header>

    
      )}
</div>
    );
}
export default NavBar