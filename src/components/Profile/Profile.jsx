import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'
import RankSystem from '../RankSystem/RankSystem'
import ProfileSettings from './ProfileSettings/ProfileSettings'
import { useAuth } from '../userContext/userContext'


function Profile({setBG}) {
    const {user} = useAuth()
    const {username, rank} = user

      return (
        <div className='profile-container'>

            <div className='profile-component'>
                <div className='user-info-wrapper'>
                    <div className='profile-user'>
                        <span className=''>Welcome </span> 
                        <span className='profile-name'>{username}</span>   
                    </div>
                    <div
                        className='profile-rank'
                    >
                        <span className='rank-text'>Your current rank is: </span>
                        <span className='rank'>{rank}</span>
                </div>
            </div>
        
            <div className='profile-settings-wrapper'>
                <Link to='/profile/settings' replace>Settings</Link>
                <Link to='/profile/rank-system' replace>Rank System</Link>
            </div>
            
        </div>
        
    </div>
        
  )
}

export default Profile