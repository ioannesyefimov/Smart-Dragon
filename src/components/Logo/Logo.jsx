import React, {useContext} from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import dragon from './dragon.png'

function Logo() {
  
  return (
      <div
      className='ma4 mt0  logo' >
      <Tilt>
          <div 
          className={`Tilt br2 shadow-2 pa4 `}
          
          >
            <img style={{paddingTop: '5px'}}src={dragon} alt='logo' ></img>
          </div>
      </Tilt>
      </div>

  )
}

export default Logo