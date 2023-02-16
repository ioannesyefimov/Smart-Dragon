import React, { useContext, useState, useMemo, useEffect} from 'react'
export const ProfileSettingsContext = React.createContext()


export function useProfileSettings() {
    return useContext(ProfileSettingsContext)
}

export function ManaceAccProvider ({children}) {
    const [toggledForm, setToggledForm] = useState('')

    const [isToggledBgHandler, setIsToggledBgHandler] = useState(false)

    const [accManager, setAccManager] = useState(false)

    const [serverResponse, setServerResponse] = useState('')

    const [isToggled, setIsToggled] = useState('')



    const setFormState = (event, typeFunc, typeRef, ) => {
        if(event.target.type === 'checkbox') return typeFunc(prev=>!prev)
      typeRef.current = event.target
      typeFunc(event.target.value)
  } 
      
      const value = useMemo(
        () => ({
            toggledForm,
            isToggledBgHandler,
            accManager,
            serverResponse,
            isToggled,
            setAccManager,
            setIsToggledBgHandler,
            setFormState,
            setToggledForm,
            setServerResponse,
            setIsToggled
          
        }),
        [accManager,toggledForm,isToggledBgHandler,serverResponse]
      );

    return (
        <ProfileSettingsContext.Provider value={value}>
            {children}
        </ProfileSettingsContext.Provider>
    )

}