import React, {useState} from 'react'
import ParticlesBgHandler from './ParticlesBgHandler/ParticlesBgHandler'
import ManageAccount from './ManageAccount/ManageAccount'
import './ProfileSettings.css'
import { useProfileSettings } from './ManageAccount/ManageAccoutContext'

function ProfileSettings({setBG}) {
 const {isToggledBgHandler, accManager} = useProfileSettings()
  
  return (

    <div className='profile-settings'>
      {isToggledBgHandler && !accManager ? 
       (
         <ParticlesBgHandler  setBG={setBG}/>
       )
      : accManager && !isToggledBgHandler ? 

      (
        <ManageAccount  />     
      )
        : !isToggledBgHandler && !accManager ? 
        (
          <>
            <ParticlesBgHandler  setBG={setBG}/>
            <ManageAccount  />     
          </>
        )
        : 
        (null)
        }
        
    </div>

  )
}

export default ProfileSettings