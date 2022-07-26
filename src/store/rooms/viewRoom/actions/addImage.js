import axios from "axios";
import buildUrl from "../../../../utils/buildUrl";
import { addingRoomImage , addingRoomImageSuccess, addingRoomImageFailed } from "../viewRoomSlice";
import viewRoom from "./viewRoom";

const addImage = (room_id,imageData) =>{   
    
    return (dispatch,getState)=>{   
            
        dispatch(addingRoomImage());

        const url = buildUrl(`room/addImage/${room_id}`);

        const payload = {
            image    : imageData
        };

        var formdata = new FormData();

        formdata.append("image",payload.image);
        formdata.append("authToken" , `Bearer ${getState().authenticate_user.auth_token}`);

        axios.post(url,formdata).then((res)=>{
            console.log("response code = ",res.status);
            if(res.status===200){
                console.log("Response data = ",res.data);
                if(res.data["status"]==="success"){
                    dispatch(addingRoomImageSuccess());
                    dispatch(viewRoom(room_id));
                }
                else{
                    dispatch(addingRoomImageFailed(res.data["message"]));
                }
            }
            else{
                dispatch(addingRoomImageFailed("Failed to add image "+res.statusText));
            }

        }).catch((err)=>{
            console.error(err);
            dispatch(addingRoomImageFailed(err.message));
        });
    }

}

export default addImage;