import React, {useState,useEffect } from 'react'
import { useAuth } from '../userContext/userContext'
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



function ParticlesBgHandler({setIsToggledBgHandler, setBG}) {

  return (
    <div className='particles-handler'>
        <div className='buttons'>
        {types.map(type => {
            return <button className=' grow particle-btn' key={type} onClick={(e)=>setBG(type) }>{type}</button>
        })}
        </div>
     
        <button className='hide-btn  grow' onClick={()=> {
          setIsToggledBgHandler(false)
          
          }}
          >Hide </button>
    </div>
  )
}

export default ParticlesBgHandler