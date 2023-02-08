import React from 'react'
import Logo from '../Logo/Logo'
import { Link,Outlet } from 'react-router-dom'
import { useAuth } from '../userContext/userContext'


function ProfileLayOut() {
  const {logout} = useAuth()
  
  return (
    <nav className='navigation navigation-profile'>
        <Logo />
        <ul>
         <li  className="navigation-component  "
         >
           <Link to='/'>Go back</Link>
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
        <Outlet/>
      
       </nav>
  )
}

export default ProfileLayOut