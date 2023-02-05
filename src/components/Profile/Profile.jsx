import React, {useState} from 'react'
import './Profile.css'
import RankSystem from '../RankSystem/RankSystem'



function Profile({name, rank}) {
    const [isShowedRankSystem, setIsShowedRankSystem] = useState(false)
  return (
    <div className='profile-container'>
        
                (<div className='profile-component'>
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
                {isShowedRankSystem ? (null) : (<button
                    className='profile-btn'
                    onClick={(e) => setIsShowedRankSystem(true)}>
                        Rank System
                    </button>)}
                    {isShowedRankSystem ? 
                    (
                    <div  className="rank-system-container">
                        <RankSystem setIsShowedRankSystem={setIsShowedRankSystem} />
                        <button className='profile-btn' onClick={(e) => setIsShowedRankSystem(false)}>hide</button>
                    </div>
                    )
                    : 
                    (null)
                    }   
            </div>)
            
    </div>
        
  )
}

export default Profile