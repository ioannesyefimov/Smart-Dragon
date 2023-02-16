import React from 'react'
import ReactDOM from 'react-dom/client'
import {ClarifaiProvider} from './components/ClarifaiProvider/ClarifaiProvider'
import { AuthProvider} from './components/userContext/userContext'

import 'tachyons'
import {App} from './App'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <ClarifaiProvider>
            <App />
        </ClarifaiProvider>
    </AuthProvider>



 
)
