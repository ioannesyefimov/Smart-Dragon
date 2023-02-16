import React, { useState, useEffect } from 'react'
import {useAuth} from '../userContext/userContext'
import './register.css'
import AlertDiv from './alertDiv/AlertDiv'
import { Errors } from '../Erorrs/Errors'
export const emailRegex = /[\w-]+@([\w-]+\.)+[\w-]+/
export const validateForm = (email, password, userName, emailRef, passwordRef, userNameRef, error)=>{
    // validate form 
    if(email.length < 1){
        emailRef.current.classList.add('error')
        return false
    } else if (!emailRegex.test(email)){
        emailRef.current.classList.add('error')
        return false
    }
    else {
        emailRef.current.classList.remove('error')
    }

    if(password.length < 1){
        passwordRef.current.classList.add('error')
        return false


    } else if (error == Errors.INVALID_PASSWORD){
        passwordRef.current.classList.add('error')
        alert(Errors.INVALID_PASSWORD)
        return false

    } else if (error == Errors.PASSWORD_CONTAINS_NAME){
         passwordRef.current.classList.add('error')
         alert(Errors.PASSWORD_CONTAINS_NAME)
         return false
    } else {
        passwordRef.current.classList.remove('error')

    }

    if(userName.length < 1){
        userNameRef.current.classList.add('error')
        return false
    } else {
        userNameRef.current.classList.remove('error')
    }
    return true
   
    
}

function Register() {

    const {loadUser} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [registerError, setRegisterError] = useState('')

    // set reference on mounting
    useEffect(()=>{
        userNameRef.current.focus()
        emailRef.current.focus()
        passwordRef.current.focus()
    },[])

 

    const userNameRef = React.useRef(null)
    const emailRef = React.useRef(null)
    const passwordRef = React.useRef(null)

    

    const handleServerResponse =(response)=>{
        // specific regex to match type of server's response in obj.detail
        const emailExistReg = /^(Key)\s\((email)\)/
        const userNameExistsReg = /^(Key)\s\((username)\)=\(\w+\)\s(already)\s(exists.)/

        if(emailExistReg.test(response.detail)){
            setRegisterError('email')
        }
        else if(userNameExistsReg.test(response.detail))
        setRegisterError('username')
    }

  

    let onEmailChange = (e) => {
        const value = e.target.value
        if(value){
            setEmail(value)
        } else {
            validateForm(email, password, userName, emailRef, passwordRef, userNameRef)
        }
    }
    let onPasswordChange = (e) => {

        setPassword(e.target.value)

    }
    let onNameChange = (e)=>{
        setUserName(e.target.value)

    }

    let onSubmitSignIn = (e) => {
        e.preventDefault()
        if(validateForm(email, password, userName, emailRef, passwordRef, userNameRef) === false){
            return 
        }

        fetch('https://smart-dragon-server.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                username: userName,

            })
        }).then(response => response.json())
        .then(user => {
            if(user.id){
                loadUser(user)
                setRegisterError('')

            } else if(user.detail) {
                handleServerResponse(user)
            }
            else if (typeof user === 'string' && user.includes(Errors.INVALID_PASSWORD)){
                validateForm(email, password, userName,emailRef,passwordRef,userNameRef, Errors.INVALID_PASSWORD)
                console.log(user)

            } else if( typeof user === 'string' &&user.includes(Errors.PASSWORD_CONTAINS_NAME)){
                validateForm(email, password, userName,emailRef,passwordRef,userNameRef, Errors.PASSWORD_CONTAINS_NAME)
                console.log(user)

            }
            
            
        })
        .catch(err=> {
            console.log(err, 'error')
        })
    }

  return (
    <>
    <article style={{marginTop: '8rem'}} className=" br2  ba dark-gray b--black-10 mv4 w-100 w-70-m w-25-l mw6 shadow-5 center register-form ">
            {registerError ? <AlertDiv setServerResponse={setRegisterError} serverResponse={registerError} /> : (
            <main className="pa4 black-80 tc " >
            <form className="measure w-100 center ">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db  fw6 lh-copy f4" htmlFor="name" >Username</label>
                    <input ref={userNameRef}
                    onChange={(e)=> onNameChange(e)}
                    
                    className="pa2 br3 input-reset ba b--near-black bg-transparent hover-bg-black hover-white w-100" type="text" name="email-address"  id="name"/>
                </div>
                <div className="mt3">
                    <label className="db  fw6 lh-copy f4" htmlFor="email-address" >Email</label>
                    <input ref={emailRef}
                    onChange={(e)=> onEmailChange(e)}
                    
                    className="pa2 br3 input-reset ba b--near-black bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <div className='wrapper'>
                        <label className="db fw6 lh-copy f4" htmlFor="password" >Password</label>
                        <div className='password-hint'>
                            <button onClick={(e)=> e.preventDefault()}>?</button>
                            <p className='info-text'>{Errors.INVALID_PASSWORD}</p>
                        </div>
                        
                    </div>
                    <input ref={passwordRef}
                    onChange={(e)=> onPasswordChange(e)}
                    
                    className="pa2 br3 input-reset ba b--near-black bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input
                 className="b br3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
                 type="submit" value="Register"
                 onClick={(e) => onSubmitSignIn(e)}
                 />
                </div>
            
            </form>
        </main>
)}
        
    </article>
    </>
  )
}

export default Register