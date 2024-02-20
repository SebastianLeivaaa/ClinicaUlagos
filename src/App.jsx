import React from 'react'
import { Routes, Route } from "react-router-dom";

import { NavBar } from './components/NavBar'
import { AccordionSection } from './components/accordionSection'
import { Login } from './pages/login';
import { Home } from './pages/home';
import { SignIn } from './pages/signIn';
import { SignInTwo } from './pages/signInTwo';
import { SignInThree } from './pages/signInThree';
import { SignInFinal } from './pages/signInFinal';

function App() {
  return (
    <div className='w-[60%] ml-[20%] mr-[20%] max-2xl:w-[100%] max-2xl:ml-[0%] max-2xl:md-[0%] max-lg:overflow-x-hidden gap-y-6 flex flex-col'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-in-two" element={<SignInTwo/>}/>
        <Route path="/sign-in-three" element={<SignInThree/>}/>
        <Route path="/sign-in-final" element={<SignInFinal/>}/>
      </Routes>
    </div>
  )
}

export default App
