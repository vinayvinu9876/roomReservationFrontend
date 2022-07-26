import axios from "axios";
import buildUrl from "../../utils/buildUrl";
import { fetchingPriority , fetchingPriorityFailed, fetchingPrioritySuccess  } from "./prioritySlice";


const fetchPriority = () =>{

    return (dispatch,getState) => {

        dispatch(fetchingPriority());

        const url = buildUrl("priority/read");

        const payload = {
            "authToken" : `Bearer ${getState().authenticate_user.auth_token}`
        };

        axios.post(url,payload).then((res)=>{

            if(res.status===200){
                console.log("Result = ",res.data);
                if(res.data["status"]==="success"){
                    dispatch(fetchingPrioritySuccess(res.data["data"]));
                }
                else{
                    dispatch(fetchingPriorityFailed(res.data["message"]));
                }
            }   
            else{
                dispatch(fetchingPriorityFailed("Failed to fetch priority "+res.statusText));
            }

        }).catch((err)=>{
            console.error(err);
            dispatch(fetchingPriorityFailed(err.message));
            return;
        })
        
    }

}

export default fetchPriority;