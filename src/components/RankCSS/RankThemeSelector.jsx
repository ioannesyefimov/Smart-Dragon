import React, {useEffect} from 'react'
import Rank from '../Rank/Rank'

export  const ranks = ['newbie', 'junior', 'professor', 'chancellor','vizier','emperor']

export const RankThemeSelector = ({children,rank}) => {

  let RankCss  = React.lazy(()=> import(`./${rank}.jsx`))
  useEffect(()=> {
    RankCss = React.lazy(()=> import(`./${rank}.jsx`))
  }, [rank])
  
  
    return (
      <>
        <React.Suspense fallback={<></>}>
        {rank && <RankCss/>}
        </React.Suspense>
        {children}
      </>
    )
  }