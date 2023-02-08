import React, {useState} from 'react'
import './Profile.css'
import RankSystem from '../RankSystem/RankSystem'
import ParticlesBgHandler from '../ParticlesBgHandler/ParticlesBgHandler'
import { useAuth } from '../userContext/userContext'


function Profile({setBG}) {
    const {user} = useAuth()
    const {name, rank} = user

    const [isShowedRankSystem, setIsShowedRankSystem] = useState(false)
    const [isToggledBgHandler, setIsToggledBgHandler] = useState(false)
      return (
        <div className='profile-container'>

            <div className='profile-component'>
            <div className='profile-user'>
                <span className=''>Welcome </span> 
                <span className='profile-name'>{name}</span>   
            </div>
            <div
                className='profile-rank'
            >
                <span className='rank-text'>Your current rank is: </span>
                <span className='rank'>{rank}</span>
            </div>

            {isShowedRankSystem ? (<div  className="rank-system-container">
                    <RankSystem setIsShowedRankSystem={setIsShowedRankSystem} />
                    <button className='profile-btn' onClick={(e) => setIsShowedRankSystem(false)}>hide</button>
                </div>) : (<button
                className='profile-btn'
                onClick={(e) => setIsShowedRankSystem(true)}>
                    Rank System
                </button>)}
                {isToggledBgHandler? (<ParticlesBgHandler setBG={setBG}  setIsToggledBgHandler={setIsToggledBgHandler}/>) : (<button className='bg-pattern-btn' onClick={()=> setIsToggledBgHandler(true)}>BG Pattern</button>)}
            
        </div>
        
    </div>
        
  )
}

export default Profile