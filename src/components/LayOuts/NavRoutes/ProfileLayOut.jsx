import React from 'react'
import Logo from '../../Logo/Logo'
import { Link,Outlet } from 'react-router-dom'
import { useAuth } from '../../userContext/userContext'


function ProfileLayOut({children, redirectedPath='/'}) {
  const {logout} = useAuth()
  
  return (
   <>
    <nav className='navigation navigation-profile'>
      <Logo />
      <ul>
      <li  className="navigation-component  "
      >
        <Link to={redirectedPath}>Go back</Link>
      </li>
      <li 
        onClick={() =>{
          window.localStorage.removeItem('user')
          logout()
          }}
          className="navigation-component  ">
          <Link to='/signin'>Sign Out</Link>
          </li>
      </ul>
    
    </nav>
    {children}
   </> 
  )
}

export default ProfileLayOut