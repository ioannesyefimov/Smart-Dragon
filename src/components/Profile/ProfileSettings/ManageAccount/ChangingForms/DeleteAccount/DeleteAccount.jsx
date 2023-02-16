import React, {useState, useEffect} from 'react'
import {  validateForm } from '../../../../../Register/Register'
import { handleResponse } from '../HandleServerResponse/handleResponse'
import { useProfileSettings } from '../../ManageAccoutContext'
import ChangingFormComponent from '../ChangingFormComponent'
import { useAuth } from '../../../../../userContext/userContext'
import { Errors } from '../../../../../Erorrs/Errors'
import { STATUS } from 'clarifai/dist/constants'

function deleteAccount({}) {
    const {user, logout} = useAuth()

    const {setToggledForm,setFormState, isToggled, setIsToggled, serverResponse, setServerResponse} = useProfileSettings()

    const [emailPrompt, setEmailPrompt] = useState('')
    const [passwordPrompt, setPasswordPrompt] = useState('')
    const [updatedChange, setUpdatedChange] = useState(false)

    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const checkboxRef = React.useRef()

  

    const handleDelete= (e) => {
        e.preventDefault()
        if(!emailPrompt == user.email) {
            emailRef.current.classList.add('error')
            setServerResponse(Errors.WRONG_EMAIL)
            return
        }
        if(validateForm(emailPrompt, passwordPrompt, updatedChange, emailRef, passwordRef, checkboxRef, '') === false) return
        if(!updatedChange) {
            checkboxRef.current.classList.add('error')
        }
        

        fetch('https://smart-dragon-server.onrender.com/profile/settings', {method: 'delete', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: emailPrompt,
            password: passwordPrompt,

        })} )
        .then(response=> response.json())
        .then(status=> {
            handleResponse(status, setServerResponse, setIsToggled)
            

        })
        .catch(err=> console
            .log(err))
    }

    if(isToggled == 'delete' && serverResponse.includes(`change-success`)){
        return <ChangingFormComponent  showedState={serverResponse}  />
    }
    else if (isToggled == 'delete' && !serverResponse.includes('change-success')){
        return (
            <ChangingFormComponent 
                showedState={`form`}
                setEmail={setEmailPrompt}
                setPassword={setPasswordPrompt}
                setUpdatedChange={setUpdatedChange}
                isChecked={updatedChange}
                emailRef={emailRef} passwordRef={passwordRef}
                updatedRef={checkboxRef} 
                type={`delete`}
                handleChange={handleDelete}
            
            />
        )
    }
    else if (isToggled == '' && !serverResponse.includes('change-success')){
        return (
            <div className='form-wrapper'>
                <button onClick={()=> {
                setToggledForm('delete')
                setIsToggled('delete')}
                } className='change-btn hover-element btn'>Delete Account</button>
            </div>
        )
    }

   
  
}

export default deleteAccount