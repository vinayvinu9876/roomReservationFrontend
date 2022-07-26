import axios from "axios";
import buildUrl from "../../utils/buildUrl";
import { setFetchingUserRooms ,  setFetchingUserRoomsSuccesful, setFetchingUserRoomsFailure } from "./userRoomSlice";

const fetchUserRooms = (pageNo) => {  

    return (dispatch,getState) => { 

        dispatch(setFetchingUserRooms());

        pageNo = pageNo ? pageNo : 1;
        const url = buildUrl(`room/get_user_room_data/${pageNo}`);

        let payload = {
            "authToken" : `Bearer ${getState().authenticate_user.auth_token}`
        };

        axios.post(url,payload).then((res)=>{
            console.log("Response = ",res.data);

            if(res.status === 200){ 
                if(res.data["status"]==="success"){
                    dispatch(setFetchingUserRoomsSuccesful(JSON.parse(res.data["data"])));
                }
                else{
                    dispatch(setFetchingUserRoomsFailure(res.data["message"]));
                }
            }
            else{
                dispatch(setFetchingUserRoomsFailure(res.statusText));
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(setFetchingUserRoomsFailure(err.message));
        })
    }

}

export default fetchUserRooms;