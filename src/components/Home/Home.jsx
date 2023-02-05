import React from 'react'
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm'
import Logo from '../Logo/Logo'
import Rank from '../Rank/Rank'
import FaceRecognition from '../FaceRecognition/FaceRecognition'

function Home({user, onRouteChange, onImageSubmit, onInputChange, imageUrl, hasEror, box}) {
  return (
    <div className='home-component'>
    <Logo />
      <Rank name={user.name} entries={user.entries} onRouteChange={onRouteChange}/>
      <ImageLinkForm
      onImageSubmit={onImageSubmit} onInputChange={onInputChange}
      />
      <FaceRecognition
      box={box} imageUrl={imageUrl} error={hasEror} 
      />
  </div>
  )
}

export default Home