import React from 'react'
import './Navigation.css'
import Logo from '../Logo/Logo'

function Navigation({onRouteChange,user, setUser, route}) {
   if(user.id && route === 'home') {
    return(
      <nav className='navigation navigation-home'>
           <p 
           onClick={()=> {
            onRouteChange('profile')
           }}
           className='profile navigation-component '
           >
            Profile
            </p>
        <p  
        onClick={() =>{
           onRouteChange('signout')
            window.localStorage.removeItem('user')
            setUser({})
        }}
           className="navigation-component  "
           >
            Sign Out
           </p>
      </nav>
    )
    } else if ( route ==='signin'  || route === 'register' || route === 'signout' ) {
      return(
        <nav className='navigation navigation-sign_register'>
          <p  
          onClick={() => onRouteChange('signin')}
          className="navigation-component  pointer">Sign In</p>
           <p  
          onClick={() => onRouteChange('register')}
          className="navigation-component  pointer">Register</p>
        </nav>
      )
    } else if (route === 'profile'){
      return (
        <nav  className='navigation navigation-profile'>
          <Logo  />
         <div className='wrapper'>
          <p
          className= "navigation-component"
           onClick={()=> {
             onRouteChange('home')
           }}
           >Go back</p>
          <p  
          onClick={() =>{
            onRouteChange('signout')
              window.localStorage.removeItem('user')
              setUser({})
              onRouteChange('signout')
          }}
           className="navigation-component  "
           >
            Sign Out
           </p>
          
         </div>
          </nav>
      )
    }
  
}

export default Navigation