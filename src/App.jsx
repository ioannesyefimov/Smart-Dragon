import React, {useState, useEffect} from 'react'
import ParticlesBg from 'particles-bg'
import {ClarifaiProvider} from './components/ClarifaiProvider/ClarifaiProvider'
import { AuthProvider} from './components/userContext/userContext'
import { RankThemeSelector } from './components/RankCSS/RankThemeSelector'

import AppRoutes from './components/Routes/Routes'

import './App.css'
import 'tachyons'
import './components/RankSystem/RankStyles.css'



export const App = () => {

  const [particlesBg, setParticlesBg] = useState('coweb')

  useEffect(()=> {
    const PREVIOUS_BG = window.localStorage.getItem('BG_PARTICLES_TYPE')
    if(PREVIOUS_BG){
     setParticlesBg(JSON.parse(PREVIOUS_BG))
   }
  }, [particlesBg])
  
  const setBG = (type)=>{
    setParticlesBg(type)
    window.localStorage.setItem('BG_PARTICLES_TYPE',JSON.stringify(type))
  }
 
    return (
      <AuthProvider>
        <ClarifaiProvider >
          <RankThemeSelector >

            <div className="App ">
              <ParticlesBg className="particles-bg" color=""  type={particlesBg} bg={true} />
              <AppRoutes setBG={setBG}/>
            </div>
          </RankThemeSelector>
        </ClarifaiProvider>
      </AuthProvider>



    )

}

