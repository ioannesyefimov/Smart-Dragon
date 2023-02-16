
import React from 'react'

import '../../Erorrs/errors.css'
import { Link, Outlet } from 'react-router-dom'
function LoggedOutLayOut({}) {
    return (
            <nav className='navigation navigation-logged-out'>
            <ul>
                <li  className="navigation-component  "
            
                >
                <Link to='/signin'>Sign in</Link>
                </li>
                <li 
                onClick={() =>{
                    
                }}
                className="navigation-component  ">
                <Link to='/register '>Register</Link>
                </li>
            </ul>
        </nav>
        
    )
}

export default LoggedOutLayOut