import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import { useAuth } from '../userContext/userContext'
function LoggedLayOut() {
  const {logout} = useAuth()
  return (
    <nav className='navigation navigation-home'>
       <ul>
        <li  className="navigation-component  "
      
        >
          <Link to='/profile'>Profile</Link>
        </li>
        <li 
          onClick={() =>{
            window.localStorage.removeItem('user')
            logout()
        }}
        className="navigation-component  ">
          Sign Out
        </li>
       </ul>
       <Outlet/>
    
     
      </nav>
  )
}

export default LoggedLayOut