import React, {useState, useEffect} from 'react'
import {  validateForm } from '../../../../../Register/Register'
import { Errors } from '../../../../../Erorrs/Errors'
import { handleResponse } from '../HandleServerResponse/handleResponse'
import { useProfileSettings } from '../../ManageAccoutContext'
import ChangingFormComponent from '../ChangingFormComponent'
import { useAuth } from '../../../../../userContext/userContext'

function ChangeEmail({}) {
    const {setToggledForm, isToggled, setIsToggled, serverResponse, setServerResponse} = useProfileSettings()
    const {user}  = useAuth()
    const [emailPrompt, setEmailPrompt] = useState(null)
    const [passwordPrompt, setPasswordPrompt] = useState(null)
    const [updatedChange, setUpdatedChange] = useState(null)
    const [changeMessage, setChangeMessage] = useState(``)


    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const newEmailRef = React.useRef()

  

    const handleChangeEmail = (e) => {
        e.preventDefault()
        if(!emailPrompt == user.email) {
            emailRef.current.classList.add('error')
            setServerResponse(Errors.WRONG_EMAIL)
            return
        }
        if(validateForm(emailPrompt, passwordPrompt, updatedChange, emailRef, passwordRef, newEmailRef, '') === false) return
        

        fetch('https://smart-dragon-server.onrender.com/profile/settings/email', {method: 'put', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: emailPrompt,
            password: passwordPrompt,
            newEmailInput: updatedChange,

        })} )
        .then(response=> response.json())
        .then(status=> {
            console.log(status)
            handleResponse(status, setServerResponse, setChangeMessage)
        })
        .catch(err=> console
            .log(err))
    }

    if(isToggled == 'email' && serverResponse.includes(`change-success`)){
        return <ChangingFormComponent  message={changeMessage}  showedState={serverResponse}  />
    }
    else if (isToggled == 'email' && !serverResponse.includes('change-success')){
        return (
            <ChangingFormComponent 
                showedState={`form`}
                setEmail={setEmailPrompt}
                setPassword={setPasswordPrompt}
                setUpdatedChange={setUpdatedChange}
                emailRef={emailRef} passwordRef={passwordRef}
                updatedRef={newEmailRef} 
                type={`email`}
                handleChange={handleChangeEmail}
            
            />
        )
    }
    else if (isToggled == '' && !serverResponse.includes('change-success')){
        return (
            <div className='form-wrapper'>
                <button onClick={()=> {
                setToggledForm('email')
                setIsToggled('email')}
                } className='change-btn hover-element btn'>Change Email</button>
            </div>
        )
    }

   
  
}

export default ChangeEmail