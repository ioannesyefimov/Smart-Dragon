import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ProfileSearch() {
    const {name} = useParams()
    const [searchedUser, setSearchedUser] = useState({})

    useEffect(()=>{
        if(name){
            fetch(`https://smart-dragon-server.onrender.com/profile/${name}`)
            .then(response => response.json())
            .then(user=> {
                console.log(user.email)
                if(user){
                    setSearchedUser(user)
                }
            })
            .catch(err=>  new Error)
            
        }

    }, [])


    return (
        <div className='profile-container'>

            <div className='profile-component'>
            <div className='profile-user'>
                <span className='profile-name'>{searchedUser.username}</span>   
            </div>
            <div
                className='profile-rank'
            >
                <span className='rank-text'>{searchedUser.username}'s current rank is: </span>
                <span className={`rank ${searchedUser.rank}-P`}>{searchedUser.rank}</span>
            </div>

        </div>
        
    </div>
  )
}

export default ProfileSearch