import React from 'react'
import './Rank.css'
function Rank({name, entries,  onRouteChange}) {
  return (
    <div className='rank-component '>
      <div
      className='rank-text '
      >
        <p 
        onClick={()=> onRouteChange('profile')}
        className={`name `}>{name}</p> <span>your current entry count is...</span>
      </div>
      <div
      className={`rank-number `}
      onClick={()=> onRouteChange('profile')}
      >
        {entries}
      </div>
    </div>
  )
}

export default Rank