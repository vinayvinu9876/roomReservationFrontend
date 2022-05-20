import axios from "axios";
import buildUrl from "../../../../utils/buildUrl";
import { setFetchingRoomData, setFetchingRoomDataFailure, setFetchingRoomDataSuccess } from "../viewRoomSlice";

const viewRoom = (room_id) =>{

    return (dispatch,getState) => {

        dispatch(setFetchingRoomData());

        const url = buildUrl(`room/read/${room_id}`);

        return axios.post(url).then((res)=>{
            if(res.status===200){

                if(res.data["status"]==="success"){
                    dispatch(setFetchingRoomDataSuccess(res.data["data"]));
                }
                else{
                    dispatch(setFetchingRoomDataFailure(res.data["message"]));
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