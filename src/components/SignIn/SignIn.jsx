import React, {useState} from 'react'
import './SignIn.css'
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../userContext/userContext';
import { emailRegex } from '../Register/Register';

function SignIn() {
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [formError, setFormError] = useState('')
    const navigate = useNavigate();
    const {loadUser} = useAuth()

    const passwordRef = React.createRef(null)
    const emailRef = React.createRef(null)

    let onEmailChange = (e) => {
        emailRef.current = e.target
        setSignInEmail(e.target.value)
    }
    let onPasswordChange = (e) => {
        passwordRef.current = e.target

        setSignInPassword(e.target.value)
    }

    let onSubmitSignIn = (e) => {
        if(signInEmail == ''){
            emailRef.current.classList.add('error')
            return
        } 
        else if (emailRegex.test(signInEmail) == false){
            setFormError('incorrect email address')
            emailRef.current.classList.add('error')
            return

        }
        else {
            emailRef.current.classList.remove('error')
        }
        if(signInPassword == ''){
            passwordRef.current.classList.add('error')
            return

        } else {
            passwordRef.current.classList.remove('error')

        }

        e.preventDefault();
        // fetch('https://smart-dragon-server.onrender.com/signin', {
        //     method: 'post',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         email: signInEmail,
        //         password: signInPassword,
        //     })
        fetch('https://smart-dragon-server.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            })
        }).then(response => response.json())
        .then(user => {
            if(user.id ){
                setFormError('')
                loadUser(user)
                window.localStorage.setItem('user', JSON.stringify(user))
                // fetch("https://smart-dragon-server.onrender.com/rank",{
                //     method: "put",
                //     headers: {'Content-Type': 'application/json'},
                //     body: JSON.stringify({
                //         email: user.email,
                //         entries: user.entries
                //     })
                // })
                fetch("http://localhost:3000/rank",{
                    method: "put",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: user.email,
                        entries: user.entries
                    })
                })
                navigate('/');
                setFormError('')
            } else if (user.includes('such user doesn\'t exist')){
                setFormError(user)
            } else if (user.includes('wrong password')){
                setFormError(user)
            }
        })
    }

  return (
    <>
    <article style={{marginTop: '8rem'}} className="br2  ba dark-gray b--black-10 mv4 w-100 w-75-m w-25-l mw6 shadow-5 center ">
        <main className="pa4 black-80 tc signin-component signin-form">
       
            <div className="measure w-100 center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db  fw6 lh-copy f4" htmlFor="email-address">Email</label>
                    <input  ref={emailRef}
                    onChange={(e)=> onEmailChange(e)}
                    className="pa2 br3 input-reset ba b--near-black bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    {formError == 'such user doesn\'t exist' ? <div className='error-signin'>{formError}</div> : formError == 'incorrect email address' ? <div className='error-signin'>{formError}</div> : null}
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                    <input ref={passwordRef}
                    onChange={(e)=> onPasswordChange(e)}
                    className="b br3 b--near-black mb0 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                </div>

                {formError == 'wrong password' ? <div className='error-signin'>{formError}</div> : null}
                </fieldset>
                <div className="signin" style={{display: 'flex'}}>
                <button

                style={{flexBasis: '50%', marginInline: 'auto'}}
                    className="b br2 ph4 pv2 input-reset  ba b--black bg-transparent grow pointer f4 dib" 
                    type="submit" 
                    onClick={(e) => onSubmitSignIn(e)}
                    >                    <Link to="/signin">Sign In</Link>
                    </button>
                    
                </div>
                <div className="lh-copy mt3 flex-ns register"
                >
                <button
                style={{flexBasis: '30%', marginInline: 'auto'}}
                
                    onClick={()=> {}}
                    className=" br2 ph4 pv2  ba  bg-transparent grow pointer f4 dib">
                    <Link to="/register">Register</Link>
                    </button>
                
                </div>
            </div> 
            
        
            
        </main>
    
    </article>
    </>

  )
}

export default SignIn