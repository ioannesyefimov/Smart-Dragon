import React from 'react'
import './Rank.css'

import { Link } from 'react-router-dom'
function Rank({username, entries}) {
  return (
    <div className='rank-component '>
      <div
      className='rank-text '
      >
        <div className='rank-wrapper'>
          <Link to="/profile">
            <p className='username'>{username}</p>
          </Link>
          <span>your current entry count is...</span>
        </div>
        <Link to="/profile">
        <p className='rank-number'>{entries}</p>
        </Link>     
      </div>
    </div>
  )
}

export default Rank