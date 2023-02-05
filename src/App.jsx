import React, {useState, createContext, useEffect} from 'react'
import 'tachyons'
import './components/RankSystem/RankStyles.css'
import Navigation from './components/Navigation/Navigation'
// import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
// import Logo from './components/Logo/Logo'
// import Rank from './components/Rank/Rank'
import SignIn from './components/SignIn/SignIn'
// import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import ParticlesBg from 'particles-bg'
import Profile from './components/Profile/Profile'
import { RankThemeSelector } from './components/RankCSS/RankThemeSelector'


import './App.css'



export const App = () => {
 
 
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState([{}])
  const [route, setRoute] = useState('signin')
  const [user, setUser] = useState({
    id: '',
    email: '',
    joined: '',
    rank: '',
    entries: '',
   })

  // current STATE of rank 

  const [hasEror, setHasError] = useState(false)

  // check whether user has been signed up before
  useEffect(()=> {
    const LoggedUser = JSON.parse(localStorage.getItem('user'));
    
    if(LoggedUser && LoggedUser.id){
      setUser(LoggedUser)
      setRoute('home')
      // set rank in local storage to apply css

    } else {
      return
    }

  }, [])

 
  



// refresh app state on user's change.
  useEffect(()=> {
    setImageUrl('')
    setBox([{}])
    window.localStorage.setItem('user', JSON.stringify(user))

  }, [user.id])


  // load user on fetch request from database
  const loadUser = (data) => {
      setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined,
          rank: data.rank
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
    const link = e.target.value
      setInput(link)
      setHasError(false)
}

// const setRankByEntry = (entry) => {
//   if(entry < 10){
//     setRank('newbie')


//   } else if (entry >= 10 && entry < 20){
//     setRank('junior')


  
//   } else if (entry >= 20 && entry < 40){
//     setRank('professor')



//   }
//    else if (entry >= 40 && entry < 60){
//     setRank('chancellor')



  
//   } else if (entry >= 60 && entry < 100 ){
//     setRank('vizier')




//   } else if (entry >= 100){
//     setRank('emperor')



//   }
  
// }

// post request to database to increment rank on sumbiting image
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
          setRankByEntry(count)
        })
        .catch(console.log)
      }
        displayFaceBox(calculateFaceLocation(response))
      })
        .catch(err => console.log(err));
    } else if (input.length <= 0){
      setHasError(true)
    }

  }

   
//  change apps route
  const onRouteChange = (route) => {
    setRoute(route)
  }

    return (
    <RankThemeSelector rank={user.rank}>
      <div className="App ">
            <ParticlesBg className="particles" color="#FFFFFF" num={200} type="cobweb" bg={true} />
            <Navigation user={user}   route={route}  onRouteChange={onRouteChange} setUser={setUser}/>
            {route === 'home'   
              ? <Home user={user} onRouteChange={onRouteChange} onImageSubmit={onImageSubmit} onInputChange={onInputChange} imageUrl={imageUrl} hasEror={hasEror} box={box} />
              : route === 'signin' || route==='signout' ?
              (<SignIn   loadUser={loadUser} onRouteChange={onRouteChange} />)
              : route === 'register' ?
              (<Register onRouteChange={onRouteChange} loadUser={loadUser}/> ) 
              :
              (<Profile name={user.name} rank={user.rank} route={route}/>)
            }
        </div>
    </RankThemeSelector>


    )

}

