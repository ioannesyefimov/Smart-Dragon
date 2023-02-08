import React from 'react'
import { useAuth } from '../userContext/userContext'
import { BrowserRouter,Navigate, Route, Routes } from 'react-router-dom'

import '../LayOuts/Navigation.css'
import Home from '../Home/Home'
import Register from '../Register/Register'
import SignIn from '../SignIn/SignIn'
import Profile from '../Profile/Profile'
import LoggedLayOut from '../LayOuts/LoggedLayOut'
import LoggedOutLayOut from '../LayOuts/LoggedOutLayOut'
import ProfileLayOut from '../LayOuts/ProfileLayOut'



function AppRoutes({setBG}) {
  const {user} = useAuth()


 


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LoggedLayOut/>}>
              <Route path="/" element={user.id ? <Home/> : (<Navigate to="/signin" />)} /> 
          </Route>

          <Route element={<LoggedOutLayOut/>}>
            <Route path='/signin' element={ user.id ? <Navigate to='/'/> : <SignIn/>}/>
            <Route path="register" element={ user.id ? <Navigate to='/'/> : <Register/>}/>
          </Route>

          <Route element={<ProfileLayOut/>} >
            <Route path="/profile" element={user.id? <Profile setBG={setBG}/> : <Navigate to='/signin'/> } />
          </Route>
        </Routes>

      </BrowserRouter>
    
    </>

      
  )
}



// <Routes>
// <Route element={<LoggedLayOut/>} />

// </Route>
// <Route path="/" element={ user.id ? <Home/> : <Navigate replace to={'/signin'}/>} /> 
// <Route path={`/signin`}  element={user.id ? <Navigate to="/" /> : <SignIn    />} /> 
// <Route path="/register" element={user.id ? <Navigate to="/" /> : <Register /> } />
// <Route path="/profile" element={user.id ? <Profile  /> : <Navigate to="/signin" />} />
// </Routes>

export default AppRoutes