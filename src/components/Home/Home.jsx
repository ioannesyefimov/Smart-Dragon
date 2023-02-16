import React from 'react'
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm'
import Logo from '../Logo/Logo'
import Rank from '../Rank/Rank'
import FaceRecognition from '../FaceRecognition/FaceRecognition'

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../userContext/userContext'

function Home({}) {
  const {user} = useAuth()

 
   return (
   <div className='home-component'>

    <Logo />
      <Rank username={user.username} entries={user.entries} />
      <ImageLinkForm/>
      <FaceRecognition />
      
  </div>
    
   )
}

export default Home