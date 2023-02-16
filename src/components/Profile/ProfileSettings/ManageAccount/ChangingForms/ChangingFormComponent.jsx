import React from 'react'
import { Errors } from '../../../../Erorrs/Errors'

import { useProfileSettings } from '../ManageAccoutContext'
import AlertDiv from '../../../../Register/alertDiv/AlertDiv'

function ChangingFormComponent({handleChange,showedState , setEmail, setPassword, setUpdatedChange, emailRef, passwordRef, updatedRef, type, isChecked=null, message}) {
    const {setFormState,setToggledForm, serverResponse,setServerResponse,setIsToggled } = useProfileSettings()

    
   if(showedState.includes(`change-success`)){
    return (
         <AlertDiv setToggledForm={setToggledForm}serverResponse={serverResponse} setServerResponse={setServerResponse} setIsToggled={setIsToggled} message={message}/>

    )
   }

   if(showedState.includes(`form`)){
    return (
        <div className='change-component'>
            <form className='change-form'>
                <div className='form_wrapper'>
                    <label htmlFor="email">
                        <span className='type-input'>Email</span>
                        <input  ref={emailRef} onChange={(e)=> {setFormState(e, setEmail, emailRef)}} placeholder='Type in email...' type="email" id="email" area-label="email" name="email field"/>
                        { serverResponse.includes(Errors.NOT_FOUND) 
                        ? (<div className='error'>${Errors.NOT_FOUND}</div>) 
                         : serverResponse.includes(Errors.INVALID_EMAIL) ?
                          (<div className='error'>${Errors.INVALID_EMAIL}</div>)
                           : (serverResponse.includes(Errors.EMAIL_EXIST)) ?
                             (<div className='error'>{Errors.EMAIL_EXIST}</div>) : ((serverResponse.includes(Errors.WRONG_EMAIL))) ? (<div className='error'>{Errors.WRONG_EMAIL}</div>) : (null)}
                    </label>
                </div>
                <div className='form_wrapper'>
                    <label htmlFor="password" >
                        <span className='type-input'>Password</span>
                        <input ref={passwordRef} onChange={(e)=> {setFormState(e, setPassword, passwordRef)}} placeholder='Type in pw...' type="password" id='password' aria-label='password' name="password field" />
                        { (serverResponse.includes(Errors.WRONG_PASSWORD)) ? (<div className='error'>{Errors.WRONG_PASSWORD}</div>) : (null)}

                    </label>
                </div>
                <div className='form_wrapper'>
                    <label htmlFor={`new${type}`} >
                        <span className='type-input'>{type !== 'delete' ? `new ${type}` : `Are you sure?`}</span>
                        {type.includes(`delete`) ? (
                            <input ref={updatedRef} onChange={(e)=> setFormState(e, setUpdatedChange,updatedRef )} type='checkbox' checked={isChecked}  id={`checkbox}`} />
                            
                            )
                            :
                             (
                                <input ref={updatedRef} onChange={(e)=> {setFormState(e, setUpdatedChange, updatedRef)}}
                                 placeholder={`Type in new ${type}`}
                                  id={`new${type}`}
                                   type={type.includes(`password`) ? (`${type}`)  : (type.includes(`email`)) ? (`${type} `) : (`text`)} 
                                   area-label="new password" name="new password field"
                                />
                            )
                            }
                            
                        
                        {serverResponse.includes(Errors.PASSWORD_CONTAINS_NAME)
                         ? (<div className='error'>${Errors.PASSWORD_CONTAINS_NAME}</div>)
                        : (serverResponse.includes(Errors.INVALID_PASSWORD)) 
                        ? (<div className='error'>Invalid Password</div>) 
                        : (isChecked !== null && !isChecked) ? (<div className='error'>Required</div>) :  (null)}

                    </label>
                </div>
                <button onClick={(e)=> 
                    {
                        window.localStorage.removeItem('user')
                        handleChange(e)}
                        } type='sumbit' className='submit-btn hover-element'>Submit</button>
            </form>
            <button onClick={()=> {
                setToggledForm('')
                setIsToggled('')}
                } className='back-btn hover-element btn'>back</button>
        </div>
    )
   }

}
export default ChangingFormComponent