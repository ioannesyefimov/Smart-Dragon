import React, {useState} from 'react'
import ChangeEmail from './ChangingForms/ChangeEmail/ChangeEmail'
import ChangePassword from './ChangingForms/ChangePassword/ChangePassword'
import DeleteAccount from './ChangingForms/DeleteAccount/DeleteAccount'
import ChangeUsername from './ChangingForms/ChangeUsername/ChangeUsername'
import './ManageAccount.css'
import './ChangingForms/ChangingForms.css'
import '../../../Erorrs/errors.css'
import { useProfileSettings } from './ManageAccoutContext'

function ManageAccount() {

  const {accManager, toggledForm, setAccManager} = useProfileSettings()

 

  return (
    <div className='manage-account-component'>
        { accManager === true  ? (
            <div className='acc-handler'> 
              <div className='wrapper'>
                {toggledForm == 'email'?  (<ChangeEmail />) 
              : toggledForm == 'password' ? (<ChangePassword />) 
              : toggledForm == 'username' ? (<ChangeUsername  />) 
              : toggledForm === 'delete' ? (<DeleteAccount />) 
              : toggledForm == '' ? (
                 <>
                  <ChangeEmail   />
                  <ChangePassword  />
                  <ChangeUsername  />
                  <DeleteAccount  />
                  <button className='hide-btn hover-element ' onClick={()=> setAccManager(false)} >Hide</button>
                 </>
                ) : (null)}
                  
              </div>
            </div>
          ) :  
            <div className='acc-handler'> 
             <button className='manage-acc-btn' onClick={()=> setAccManager(true)}>Acount</button>
             </div> 
    
        }
    </div>
  )
}

export default ManageAccount