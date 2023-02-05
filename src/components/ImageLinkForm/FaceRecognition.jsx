import React from 'react'
import './FaceRecognition.css'
import errorImage from './error-img.png'

function FaceRecognition({imageUrl, box,error}) {
  return (
    <div
    className='face-recognition-component'
    >
      <div className=' mt2 face-inner-div' style={{}}>
        <img id="inputimage" src={error ? errorImage : imageUrl} alt=''  style={{marginTop: '1rem'}} />
        {box.map((item,i) => {
          return  <div
          key={i}
          className='bounding-box'
         style={{top: item.topRow, right: item.rightCol, bottom: item.bottomRow, left: item.leftCol}}
         ></div>
        })}
      
      </div>
    </div>
  )
}

export default FaceRecognition