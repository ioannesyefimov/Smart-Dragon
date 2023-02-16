import React, {useState,useEffect } from 'react'
import { useAuth } from '../../../userContext/userContext'
import { useProfileSettings } from '../ManageAccount/ManageAccoutContext'
import './ParticlesHandler.css'
const types = ["color",
"ball",
"lines",
"thick",
"circle",
"cobweb",
"polygon",
"square",
"tadpole",
"fountain",
"random",
]



function ParticlesBgHandler({setBG, }) {
  const {setIsToggledBgHandler, isToggledBgHandler} = useProfileSettings()

  return (
    <div className='manage-particles-component'>
      <div className='bg-handler'>
        {!isToggledBgHandler ?
          (<button className='bg-pattern-btn' onClick={()=> setIsToggledBgHandler(true)}>BG Pattern</button>) : 
          ( 
              <div className='buttons'>
                {types.map(type => {
                    return <button className='hover-element btn particles-btn' key={type} onClick={(e)=>setBG(type) }>{type}</button>
                })}
                <button className='hide-btn  grow' onClick={()=> {
                  setIsToggledBgHandler(false)
                  
                  }}
                  >Hide </button>
                </div>
            
            )
            }

      </div>
    
    </div >
   
  )
}

export default ParticlesBgHandler