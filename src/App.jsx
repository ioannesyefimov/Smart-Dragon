import React, {useState, useEffect} from 'react'
import ParticlesBg from 'particles-bg'
import { RankThemeSelector } from './components/RankCSS/RankThemeSelector'

import AppRoutes from './components/Routes/Routes'

import './App.css'
import 'tachyons'
import './components/RankSystem/RankStyles.css'
import { useAuth } from './components/userContext/userContext'



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
    <div className="App ">
      <RankThemeSelector >
          <ParticlesBg  color="" num={100}  type={particlesBg} bg={true} />
          <AppRoutes setBG={setBG}/>
      </RankThemeSelector>
    </div>



    )

}

