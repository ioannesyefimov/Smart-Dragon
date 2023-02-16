import { Errors } from "../../../../../Erorrs/Errors"
import { useProfileSettings } from "../../ManageAccoutContext"


export const handleResponse = (response, setResponse, setMessage) => {
    if(response[0] == 'success'){
        setResponse('change-success')
        setMessage(response[1])
    }else if(response[0] == 'delete-success'){
        setResponse('delete-success')
        setMessage(response[1])

    }
    
    if(response.includes(Errors.WRONG_PASSWORD)){
        setResponse(Errors.WRONG_PASSWORD)
    } else if(response.includes(Errors.INVALID_PASSWORD)){
        setResponse(Errors.INVALID_PASSWORD)
    } else if(response.includes(Errors.INVALID_EMAIL)){
        setResponse(Errors.INVALID_EMAIL)
    } else if (response.includes(Errors.PASSWORD_CONTAINS_NAME)){
        setResponse(Errors.PASSWORD_CONTAINS_NAME)
    } else if (response.includes(Errors.USER_EXIST)){
        setResponse(Errors.USER_EXIST)

    }else if (response.includes(Errors.NOT_FOUND)){
        setResponse(Errors.NOT_FOUND)
    } else {
        return
    }
}