import React, { useEffect } from 'react'
import { useAuth } from '../userContext/userContext'
import { BrowserRouter, Link, Route, Routes, } from 'react-router-dom'

import '../LayOuts/Navigation.css'
import Home from '../Home/Home'
import Register from '../Register/Register'
import SignIn from '../SignIn/SignIn'
import Profile from '../Profile/Profile'
import ProfileSearch from '../Profile/ProfileSearch'
import ProtectedRoute from './ProtectedRoute'
import Navigation from '../LayOuts/Navigation'
import ProfileSettings from '../Profile/ProfileSettings/ProfileSettings'
import RankSystem from '../RankSystem/RankSystem'
import { ManaceAccProvider } from '../Profile/ProfileSettings/ManageAccount/ManageAccoutContext'


function AppRoutes({setBG}) {
  const {user} = useAuth()
  const isEmpty = (obj) => {
    return Object.keys(user).length === 0
  }





  return (
    <>
    
      <BrowserRouter>
          <Navigation/>
        <Routes>
          <Route  path='/signin' element={
            <ProtectedRoute isAllowed={isEmpty()} redirectedPath='/' >
                <SignIn/>
            </ProtectedRoute>}
          />
            
          <Route path="/register" element={
            <ProtectedRoute isAllowed={isEmpty()} redirectedPath='/' >
              <Register/>
          </ProtectedRoute>
          }/>

          <Route path="/" element={
            <ProtectedRoute isAllowed={!isEmpty()}  >
              <Home/>
            </ProtectedRoute>
          } />

          
          <Route path="/profile" element={
            <ProtectedRoute isAllowed={!isEmpty()} >
              <Profile />
            </ProtectedRoute>
          } />
          <Route exact path="/profile/:name" element={
             <ProtectedRoute isAllowed={true} >
               <ProfileSearch />
             </ProtectedRoute>} />
          <Route path="/profile/settings" element={
            <ProtectedRoute isAllowed={!isEmpty()} >
              <ManaceAccProvider>
                  <ProfileSettings setBG={setBG}/>
              </ManaceAccProvider>
            </ProtectedRoute>

            } />
          <Route path="/profile/rank-system" element={<ProtectedRoute isAllowed={!isEmpty()} ><RankSystem/></ProtectedRoute>}/>
          
          
          
          <Route path="*" element={
          <div className='notfound404 '>
             <h2>There's nothing here: 404!</h2>
             <Link to='/' replace>Back</Link>
          </div>} 
            />
        </Routes>

      </BrowserRouter>
    
    </>

      
  )
}



// <Routes>
// <Route element={<LoggedLayOut/>} />

// </Route>
// <Route path="/" element={ user.id.id ? <Home/> : <Navigate replace to={'/signin'}/>} /> 
// <Route path={`/signin`}  element={user.id ? <Navigate to="/" /> : <SignIn    />} /> 
// <Route path="/register" element={user.id ? <Navigate to="/" /> : <Register /> } />
// <Route path="/profile" element={user.id ? <Profile  /> : <Navigate to="/signin" />} />
// </Routes>

export default AppRoutes