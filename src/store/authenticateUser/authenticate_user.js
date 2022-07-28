import axios from 'axios';
import buildUrl from '../../utils/buildUrl';
import { authenticatingUser, userAuthenticatedSuccesfully, userAuthenticationFailed } from './authenticate_user_slice';
import checkIfAuthFailed from '../../utils/onAuthFailed';

const authenticate_user = (encrypted_session_data) =>{

    return (dispatch,getState)=>{
        
        const url = buildUrl(`authentication/authenticate_me/${encrypted_session_data}`);

        dispatch(authenticatingUser());

        axios.post(url).then((res)=>{
            if(res.status===200){
                if(res.data["status"]==="success"){
                    console.log("res.data = ",res.data);
                    dispatch(userAuthenticatedSuccesfully({token:encrypted_session_data,is_admin: res.data["is_admin"]})); 
                }
                else{
                    dispatch(userAuthenticationFailed(res.data["message"]));
                    checkIfAuthFailed(res);
                }
            }
            else{
                dispatch(userAuthenticationFailed("Failed to authenticate user"));
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(userAuthenticationFailed(err.message));
        })
        

    }

}

export default authenticate_user;