import React, { useContext, useState, useMemo, useEffect} from 'react'
import { useClarifai } from '../ClarifaiProvider/ClarifaiProvider'
export const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [user, setUser] = useState({})
    const [imageUrl, setImageUrl] = useState('')
    const [box, setBox] = useState([{}])




    useEffect(()=> {
        const LoggedUser = JSON.parse(localStorage.getItem('user'));
        
        if(LoggedUser && LoggedUser.id){
          setUser(LoggedUser)
          // setRoute('home')
          // set rank in local storage to apply css
    
        } 
       
    
    
      }, [])

      useEffect(()=>{
        window.localStorage.setItem('user', JSON.stringify(user))

      }, [user.rank])
  
  
      useEffect(()=> {
        setImageUrl('')
        setBox([{}])
        window.localStorage.setItem('user', JSON.stringify(user))
    
      }, [ user.id ])
    const loadUser = (data) => {
      setUser({
          id: data.id,
          username: data.username,
          email: data.email,
          entries: data.entries,
          joined: data.joined,
          rank: data.rank
      }
      )
  }

  


    
      // call this function to sign out logged in user
      const logout = () => {
        setUser({});
      };
   
      
      const value = useMemo(
        () => ({
          imageUrl,
          box,
          user,
          setBox,
          logout, 
          loadUser,
          setImageUrl,
          setUser
          
        }),
        [user,imageUrl,box]
      );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}