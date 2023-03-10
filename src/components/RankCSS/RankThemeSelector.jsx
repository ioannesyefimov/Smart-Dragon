import React, {useEffect, useState} from 'react'
import Rank from '../Rank/Rank'
import ParticlesBg from 'particles-bg'
export  const ranks = ['newbie', 'junior', 'professor', 'chancellor','vizier','emperor']
import { useAuth } from '../userContext/userContext'


export const RankThemeSelector = ({children}) => {
  const {user} = useAuth()
 
  const [rank, setRank] = useState(user.rank)
   let RankCss  = React.lazy(()=> import(  `./${rank}.jsx`))
  
 

  useEffect(()=> {
    setRank(user.rank)
  }, [user.rank])



  
  
    return (
      <>
        <React.Suspense fallback={<></>}>
        {rank && <RankCss/>}
        </React.Suspense>

        {children}
      </>
    )
  }