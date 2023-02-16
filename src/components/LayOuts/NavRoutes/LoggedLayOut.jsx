import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import { useAuth } from '../../userContext/userContext'
function LoggedLayOut({}) {
  const {logout} = useAuth()
  return (
    <nav className='navigation navigation-home'>
       <ul>
        <li  className="navigation-component  hover-element "
      
        >
          <Link to='/profile' replace>Profile</Link>
        </li>
        <li 
          onClick={() =>{
            window.localStorage.removeItem('user')
            logout()
        }}
        className="navigation-component hover-element  ">
          <Link to='/signin' replace>Sign Out</Link>
        </li>
       </ul>
     
      </nav>
  )
}

export default LoggedLayOut