import React from 'react'
import './ImageLinkForm.css'

function ImageLinkForm({onInputChange, onImageSubmit}) {
  return (
    <div className='link-form '>
        <p className=''>
            {'This Magic Dragon will detect faces in your pictires! Give it a try.'}
        </p>
        <div className='input-container ' >
            <div className='center  form pa4 br3 shadow-5'>
                <input onChange={(e) => onInputChange(e)} className='f3 pa1 w-70 center' type='text'/>
                <button 
                onClick={onImageSubmit}
                className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>

            </div>
        </div>
    </div>
  )
}

export default ImageLinkForm