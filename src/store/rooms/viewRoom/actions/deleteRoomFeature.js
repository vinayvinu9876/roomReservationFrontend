import axios from "axios";
import buildUrl from "../../../../utils/buildUrl";
import checkIfAuthFailed from "../../../../utils/onAuthFailed";
import { removingImageSuccess, removingRoomFeature, removingRoomFeatureFailed } from "../viewRoomSlice";
import viewRoom from "./viewRoom";

const deleteRoomFeature = (room_id,room_feature_id) => {

    return (dispatch,getState) => {

        if(room_feature_id===null){
            dispatch(removingRoomFeatureFailed("Room feature id is not valid"));
            return;
        }

        let confirm = window.confirm('Are you sure ?');

        if(!confirm){
            return;
        }

        dispatch(removingRoomFeature());

        const url = buildUrl(`roomfeatures/delete/${room_feature_id}`);

        console.log("Url = ",url);

        const payload = {
            "authToken" : `Bearer ${getState().authenticate_user.auth_token}`
        };

        axios.post(url,payload).then((res)=>{
            console.log("status = ",res.status," Status text = ",res.statusText);
            if(res.status===200){
                console.log("response = ",res.data);
                if(res.data["status"]==="success"){
                    dispatch(removingImageSuccess());
                    dispatch(viewRoom(room_id));
                }
                else{
                    dispatch(removingRoomFeatureFailed("Room feature remove"));
                    checkIfAuthFailed(res);
                }
            }
            else{
                dispatch(removingRoomFeatureFailed("Failed to delete room feature"));
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(removingRoomFeatureFailed(err.message));
        })

    }

}

export default deleteRoomFeature;