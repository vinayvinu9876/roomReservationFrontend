import axios from "axios";
import buildUrl from "../../utils/buildUrl";
import { setFetchingUserRoomViewData, setFetchingUserRoomViewDataSuccess, setFetchingUserRoomViewDataFailure   } from "./userRoomViewSlice";

const fetchRoomData = (room_id) => {

        return (dispatch,getState) => {

            dispatch(setFetchingUserRoomViewData());

            const url = buildUrl(`room/read/${room_id}`);

            const payload = {
                "authToken" : `Bearer ${getState().authenticate_user.auth_token}`
            };

            return axios.post(url,payload).then((res)=>{

                if(res.status===200){
                    if(res.data["status"]==="success"){
                        dispatch(setFetchingUserRoomViewDataSuccess(res.data["data"]));
                    }
                    else{
                        dispatch(setFetchingUserRoomViewDataFailure(res.data["message"]));
                    }
                }
                else{
                    dispatch(setFetchingUserRoomViewDataFailure("Failed to fetch room data "+res.statusText));
                }
            }).catch((err)=>{
                console.error(err);
                dispatch(setFetchingUserRoomViewDataFailure(err.message));
            })

        }

}

export default fetchRoomData;