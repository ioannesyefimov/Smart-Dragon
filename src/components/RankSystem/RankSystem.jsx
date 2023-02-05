import React from 'react'
import './RankSystem.css'
import { ranks } from '../RankCSS/RankThemeSelector'
import './RankStyles.css'
function RankSystem() {
  return (
    <div className='rank-system-component'>
        <h1>Rank System by entries count:</h1>
        <div className='ranks-container'>
          {ranks.map((rankName, i) => {
            return <p key={rankName} className={`${rankName}`}>{rankName} </p>
          })}
          

        </div>
    </div>
  )
}

export default RankSystem