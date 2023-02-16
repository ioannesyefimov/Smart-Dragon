import React, {useState, useEffect} from 'react'
import {  validateForm } from '../../../../../Register/Register'
import { handleResponse } from '../HandleServerResponse/handleResponse'
import { useProfileSettings } from '../../ManageAccoutContext'
import ChangingFormComponent from '../ChangingFormComponent'
import { useAuth } from '../../../../../userContext/userContext'

function ChangeUsername() {
    const {user} = useAuth()

    const {setToggledForm, isToggled, setIsToggled, serverResponse, setServerResponse} = useProfileSettings()

    const [emailPrompt, setEmailPrompt] = useState(null)
    const [passwordPrompt, setPasswordPrompt] = useState(null)
    const [updatedChange, setUpdatedChange] = useState(null)
    const [changeMessage, setChangeMessage] = useState(``)


    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const newUsernameRef = React.useRef()

  

    const handleChangeUserName = (e) => {
        e.preventDefault()
        if(!emailPrompt == user.email) {
            emailRef.current.classList.add('error')
            setServerResponse(Errors.WRONG_EMAIL)
            return
        }
        if(validateForm(emailPrompt, passwordPrompt, updatedChange, emailRef, passwordRef, newUsernameRef, '') === false) return
        

        fetch('https://smart-dragon-server.onrender.com/profile/settings/username', {method: 'put', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: emailPrompt,
            username: user.username,
            password: passwordPrompt,
            newUserName: updatedChange,

        })} )
        .then(response=> response.json())
        .then(status=> {
            handleResponse(status, setServerResponse, setChangeMessage)
        })
        .catch(err=> console
            .log(err))
    }

    if(isToggled == 'username' && serverResponse.includes(`change-success`)){
        return <ChangingFormComponent  message={changeMessage}  showedState={serverResponse}  />
    }
    else if (isToggled == 'username' && !serverResponse.includes('change-success')){
        return (
            <ChangingFormComponent 
                showedState={`form`}
                setEmail={setEmailPrompt}
                setPassword={setPasswordPrompt}
                setUpdatedChange={setUpdatedChange}
                emailRef={emailRef} passwordRef={passwordRef}
                updatedRef={newUsernameRef} 
                type={`username`}
                handleChange={handleChangeUserName}
            
            />
        )
    }
    else if (isToggled == '' && !serverResponse.includes('change-success')){
        return (
            <div className='form-wrapper'>
                <button onClick={()=> {
                setToggledForm('username')
                setIsToggled('username')}
                } className='change-btn hover-element btn'>Change Username</button>
            </div>
        )
    }

   
  
}

export default ChangeUsername