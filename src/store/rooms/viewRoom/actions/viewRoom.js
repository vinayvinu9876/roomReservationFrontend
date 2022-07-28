import axios from "axios";
import buildUrl from "../../../../utils/buildUrl";
import checkIfAuthFailed from "../../../../utils/onAuthFailed";
import { setFetchingRoomData, setFetchingRoomDataFailure, setFetchingRoomDataSuccess } from "../viewRoomSlice";

const viewRoom = (room_id) =>{

    return (dispatch,getState) => {

        dispatch(setFetchingRoomData());

        const url = buildUrl(`room/read/${room_id}`);

        const payload = {
            "authToken" : `Bearer ${getState().authenticate_user.auth_token}`
        };

        return axios.post(url,payload).then((res)=>{
            if(res.status===200){

                if(res.data["status"]==="success"){
                    dispatch(setFetchingRoomDataSuccess(res.data["data"]));
                    console.log("recieved room data = ",res.data["data"])
                }
                else{
                    dispatch(setFetchingRoomDataFailure(res.data["message"]));
                    checkIfAuthFailed(res);
                }

            }
            else{
                dispatch(setFetchingRoomDataFailure("Failed to fetch rooms "+res.statusText));
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(setFetchingRoomDataFailure(err.message));
        })

    }

}

export default viewRoom;