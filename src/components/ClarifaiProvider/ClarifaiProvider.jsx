import React, { useContext, useState, useMemo} from 'react'
import { useAuth } from '../userContext/userContext'

const ClarifaiDataContext = React.createContext()

export function useClarifai() {
    return useContext(ClarifaiDataContext)
}


export function ClarifaiProvider({children}){
    const [input, setInput] = useState('')
   
    const [hasErorr, setHasError] = useState(false)

    const {setImageUrl, setBox, user, setUser} = useAuth()
    

    const calculateFaceLocation = (data) => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width)
        const height = Number(image.height)
        let result = [];
        let box = [];
        if(data.outputs[0].data.regions.length > 1){
          data.outputs[0].data.regions.forEach(region => {
           result.push(region.region_info.bounding_box)
          
         })
        } else {
         result.push(data.outputs[0].data.regions[0].region_info.bounding_box);
        };
        result.forEach(item=> {
          box.push({
           leftCol: item.left_col * width,
           topRow: item.top_row * height,
           rightCol: width - (item.right_col * width),
           bottomRow: height - (item.bottom_row * height)
        })
     
     
        })
        if(!box){
         setHasError(true)
        } else {
         setHasError(false)
        }
        return box
    }
     

    const displayFaceBox = (box) => {
        setBox(box)
    }
    const onImageSubmit = () => {
        if(input.length > 0){
            setHasError(false)
    
            setImageUrl(input)
            fetch('https://smart-dragon-server.onrender.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: input
            })
            })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('https://smart-dragon-server.onrender.com/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: user.id
                    })
                    })
            .then(response => response.json())
            .then(count => {
                setUser(Object.assign(user, { entries: count}))
                
            })
            .catch(console.log)
            }
                displayFaceBox(calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
        } else if 
            (input.length <= 0){
                setHasError(true)
            }
        } 

 
    const value = useMemo(
        ()=> ({
            input,
            hasErorr,
            onImageSubmit,
            setInput,
            setHasError
        }), [input]
    )
    
    return (
        <ClarifaiDataContext.Provider value={{input,
            hasErorr,
            onImageSubmit,
            setInput,
            setHasError}}>
            { children }
        </ClarifaiDataContext.Provider>
    )
}