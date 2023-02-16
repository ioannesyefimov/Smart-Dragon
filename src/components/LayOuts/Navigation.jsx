import React from 'react'
import { useLocation } from 'react-router-dom'

import LoggedLayOut from './NavRoutes/LoggedLayOut'
import LoggedOutLayOut from './NavRoutes/LoggedOutLayOut'
import ProfileLayOut from './NavRoutes/ProfileLayOut'

function Navigation() {
    const location = useLocation().pathname
    if(location === '/'){
        return <LoggedLayOut/>
    } else if (location === '/signin' || location === '/register'){
        return <LoggedOutLayOut/>
    } else if(location === '/profile') {
        return <ProfileLayOut/>
    } else if (location === '/profile/rank-system' || location === '/profile/settings'){
        return <ProfileLayOut redirectedPath='/profile'/>
    }


  
}

export default Navigation