import React, {useState, useEffect} from 'react'
import {  validateForm } from '../../../../../Register/Register'
import { Errors } from '../../../../../Erorrs/Errors'
import AlertDiv from '../../../../../Register/alertDiv/AlertDiv'
import { useAuth } from '../../../../../userContext/userContext'
import { handleResponse } from '../HandleServerResponse/handleResponse'
import { useProfileSettings } from '../../ManageAccoutContext'
import ChangingFormComponent from '../ChangingFormComponent'

function ChangePassword({}) {
    const {setToggledForm, isToggled, setIsToggled, serverResponse,setServerResponse} = useProfileSettings()
    const {user} = useAuth()

    const [emailPrompt, setEmailPrompt] = useState(null)
    const [passwordPrompt, setPasswordPrompt] = useState(null)
    const [updatedChange, setUpdatedChange] = useState(null)
    const [changeMessage, setChangeMessage] = useState(``)

    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const newPasswordRef = React.useRef()

  

    const handleChangePassword = (e) => {
        e.preventDefault()
        if(!emailPrompt == user.email) {
            emailRef.current.classList.add('error')
            setServerResponse(Errors.WRONG_EMAIL)
            return
        }
        if(validateForm(emailPrompt, passwordPrompt, updatedChange, emailRef, passwordRef, newPasswordRef, '') === false) return
        

        fetch('http://localhost:3000/profile/settings/password', {method: 'put', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: emailPrompt,
            password: passwordPrompt,
            newPassword: updatedChange,
            username: user.username

        })} )
        .then(response=> response.json())
        .then(status=> {
            handleResponse(status, setServerResponse,setChangeMessage)
        })
        .catch(err=> console
            .log(err))
    }

    if(isToggled == 'password' && serverResponse.includes(`change-success`)){
        return <ChangingFormComponent  message={changeMessage}  showedState={serverResponse}  />
    }
    else if (isToggled === 'password' && !serverResponse.includes('change-success')){
        return (
            <ChangingFormComponent 
                showedState={`form`}
                setEmail={setEmailPrompt}
                setPassword={setPasswordPrompt}
                setUpdatedChange={setUpdatedChange}
                emailRef={emailRef} passwordRef={passwordRef}
                updatedRef={newPasswordRef} 
                type={`password`}
                handleChange={handleChangePassword}
                
            
            />
        )
    }
    else if (isToggled == '' && !serverResponse.includes('change-success')){
        return (
            <div className='form-wrapper'>
                <button onClick={()=> {
                setToggledForm('password')
                setIsToggled(`password`)}
                } className='change-btn hover-element btn'>Change Password</button>
            </div>
        )
    }



}

export default ChangePassword