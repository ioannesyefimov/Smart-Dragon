import React from 'react'
import './FaceRecognition.css'
import errorImage from './error-img.png'
import { useClarifai } from '../ClarifaiProvider/ClarifaiProvider'
import { useAuth } from '../userContext/userContext'
import loading from '../../assets/Spinner-1s-171px.svg'

function FaceRecognition() {
  const {imageUrl, box} = useAuth()
  const {hasError, isLoading} = useClarifai()


  return (
    <div
    className='face-recognition-component'
    >
 
      <div className=' mt2 face-inner-div' style={{}}>
        <img id="inputimage" src={hasError ? errorImage : imageUrl} alt=''  style={{marginTop: '0rem'}} />
        {isLoading == 'loading' ? (
          <img  className='loading' src={loading} alt='loading'/>
        ):(<></>)}
        

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