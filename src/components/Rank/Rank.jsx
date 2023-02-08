import React from 'react'
import './Rank.css'

import { Link } from 'react-router-dom'
function Rank({name, entries}) {
  return (
    <div className='rank-component '>
      <div
      className='rank-text '
      >
        <Link to="/profile">
          {name}
        </Link>
        <span>your current entry count is...</span>
        <Link to="/profile">
        {entries}
        </Link>     
      </div>
    </div>
  )
}

export default Rank