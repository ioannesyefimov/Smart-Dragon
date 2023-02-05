import React, {useState, createContext, useEffect} from 'react'
import 'tachyons'
import './components/RankSystem/RankStyles.css'
import Navigation from './components/Navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import SignIn from './components/SignIn/SignIn'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Register from './components/Register/Register'
import ParticlesBg from 'particles-bg'
import Profile from './components/Profile/Profile'

import './App.css'



export const App = () => {
 
 
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState([{}])
  const [route, setRoute] = useState('signin')
  const [user, setUser] = useState({
    id: '',
    email: '',
    entries: '',
    joined: '',
  })

  // current STATE of rank 
  const [rank, setRank] = useState('emperor')

  const [hasEror, setHasError] = useState(false)
  const [isLogged, setIsLogged] = useState(Boolean)


  // check whether user has been signed up before
  useEffect(()=> {
    const LoggedUser = localStorage.getItem('user');
    if(LoggedUser.id){
      setUser(JSON.parse(LoggedUser))
      setRoute('home')
      setIsLogged(true)

      // set rank in local storage to apply css
      window.localStorage.setItem('TYPE_OF_RANK', JSON.stringify(rank))
    }

  }, [])

  useEffect(()=> {
    window.localStorage.setItem('user', JSON.stringify(user))

  }, [user.entries])

// refresh app state on user's change.
  useEffect(()=> {
    setImageUrl('')
    setBox([{}])
  }, [user])


  // load user on fetch request from database
  const loadUser = (data) => {
      setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined 
      }
      )

  }
// calculate box location from fetch request 
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

  const onInputChange = (e) => {
    const input = e.target.value
      if(input){
      setInput(input)
      setHasError(false)
    } 
}

// post request to database to increment rank on sumbiting image
  const onImageSubmit = () => {
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
        console.log(count)
      })
      .catch(console.log)
    }
      displayFaceBox(calculateFaceLocation(response))
    })
      .catch(err => console.log(err));

  }

   
//  change apps route
  const onRouteChange = (route) => {
    setRoute(route)
  }

    return (
      <div className="App ">
            <ParticlesBg className="particles" color="#FFFFFF" num={200} type="cobweb" bg={true} />
            <Navigation route={route} setIsLogged={setIsLogged} isLogged={isLogged} onRouteChange={onRouteChange} setUser={setUser}/>
            {route === 'home'   
              ? <div className='home-component'>
                  <Logo rank={rank}/>
                    <Rank name={user.name} entries={user.entries} onRouteChange={onRouteChange}/>
                    <ImageLinkForm
                    onImageSubmit={onImageSubmit} onInputChange={onInputChange}
                    />
                    <FaceRecognition
                    box={box} imageUrl={imageUrl} error={hasEror} 
                    />
                </div>
              : route === 'signin' || route==='signout' ?
              (<SignIn setIsLogged={setIsLogged} loadUser={loadUser} onRouteChange={onRouteChange} />)
              : route === 'register' ?
              (<Register onRouteChange={onRouteChange} loadUser={loadUser}/> ) 
              :
              (<Profile name={user.name} rank={rank} route={route}/>)
            }
        </div>

    )

}


