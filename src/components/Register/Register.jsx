import React, { useState } from 'react'

function Register({onRouteChange, loadUser}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    let onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    let onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    let onNameChange = (e)=>{
        setName(e.target.value)
    }

    let onSubmitSignIn = (e) => {
        e.preventDefault()
        fetch('https://smart-dragon-server.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,

            })
        }).then(response => response.json())
        .then(user => {
            if(user.id){
                loadUser(user)
                onRouteChange('home')
            } else {
                onRouteChange('register')
            }
        })
    }

  return (
    <article style={{marginTop: '8rem'}} className="br2  ba dark-gray b--black-10 mv4 w-100 w-70-m w-25-l mw6 shadow-5 center ">
        <main className="pa4 black-80 tc">
            <form className="measure w-100 center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db  fw6 lh-copy f4" htmlFor="name">Name</label>
                    <input
                    onChange={(e)=> onNameChange(e)}
                    className="pa2 br3 input-reset ba b--near-black bg-transparent hover-bg-black hover-white w-100" type="text" name="email-address"  id="name"/>
                </div>
                <div className="mt3">
                    <label className="db  fw6 lh-copy f4" htmlFor="email-address">Email</label>
                    <input
                    onChange={(e)=> onEmailChange(e)}
                    className="pa2 br3 input-reset ba b--near-black bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                    <input
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

    </article>
  )
}

export default Register