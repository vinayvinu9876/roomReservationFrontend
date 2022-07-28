import axios from 'axios';
import buildUrl from "../../../../utils/buildUrl";
import checkIfAuthFailed from '../../../../utils/onAuthFailed';
import { removingRoomImage, removingImageSuccess, removingImageFailed } from '../viewRoomSlice';
import viewRoom from './viewRoom';

const removeRoomImage = (room_id,media_id) => {


    return (dispatch,getState)=>{

        dispatch(removingRoomImage());

        if(room_id===null){
            dispatch(removingImageFailed("Room id not found"));
            return;
        }

        if(media_id===null){
            dispatch(removingImageFailed("Media id not found"));
            return;
        }

        const url = buildUrl(`room/removeImage/${room_id}/${media_id}`);

        const payload = {
            "authToken" : `Bearer ${getState().authenticate_user.auth_token}`
        };

        return axios.post(url,payload).then((res)=>{

            if(res.status===200){
                if(res.data["status"]==="success"){
                    dispatch(removingImageSuccess());
                    dispatch(viewRoom(room_id));
                }   
                else{
                    dispatch(removingImageFailed(res.data["message"]));
                    checkIfAuthFailed(res);
                }
            }
            else{
                dispatch(removingImageFailed("Failed to remove image "+res.statusText));
            }

        }).catch((err)=>{
            console.error(err);
            dispatch(removingImageFailed(err.message));

        });

            
    }


}

export default removeRoomImage;