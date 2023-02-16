import React from 'react'
import './alertDiv.css'
import { Link } from 'react-router-dom'
import { useProfileSettings } from '../../Profile/ProfileSettings/ManageAccount/ManageAccoutContext'
import { useAuth } from '../../userContext/userContext'

function AlertDiv( {setIsToggled, serverResponse, setServerResponse, setToggledForm, message}) {
  const {logout} = useAuth()
  return (
    <div className='alert-div'>
      {serverResponse == 'email' ?
      (
        <>
        <h2>Such {serverResponse} is already exists...</h2>
        <p>Want to sign in?</p>
        <div className='wrapper'>
        <button> <Link to='/signin' replace>Sign In</Link> </button>
        <button onClick={e=> setServerResponse('')}>Change</button>
        </div>
        </>
      ) : serverResponse == 'username' ? (
        <>
        <h2>Such {serverResponse} already exists...</h2>
          <p>Want to sign in?</p>
          <div className='wrapper'>
           <button> <Link to='/signin' replace>Sign In</Link> </button>
           <button onClick={e=> setServerResponse('')}>Change </button>
          </div>
        </>
      ) : serverResponse == 'change-success' ? (
        <div className='change-success'>
          <h2>{message}</h2>
          <span>need to sign in again...</span>
          <button  onClick={e=> {
            console.log(serverResponse)
            setIsToggled('')
            setToggledForm('')
            setServerResponse('')
            logout()
          }} className='continue-btn hover-element'>Continue</button>
        </div>
      )
    
          : 
          serverResponse == 'delete-success' ?
          (
            <div className='change-success'>
          <h2>{changeMessage}</h2>
          <span>We are sory you left us</span>
          <button  onClick={e=> {
            console.log(serverResponse)
            setIsToggled('')
            setServerResponse('')
            logout()
          }} className='continue-btn'>Continue</button>
        </div>

          ) : (null)
    }
      
          
        
    </div>
  )
}

export default AlertDiv