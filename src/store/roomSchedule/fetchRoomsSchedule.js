import axios from 'axios';
import buildUrl from '../../utils/buildUrl';
import checkIfAuthFailed from '../../utils/onAuthFailed';
import { setFetchingRoomScheduleData , setFetchingRoomScheduleDataFailure, setFetchingRoomScheduleDataSuccess } from './roomScheduleSlice';

const fetchRoomsSchedule = (room_id) =>{
    return (dispatch,getState)=>{
        console.log("Room id while fetching = ",room_id);
        const url = buildUrl(`room/getRoomReservationData/${room_id}`);
        
        dispatch(setFetchingRoomScheduleData());

        const payload = {
            "authToken" : `Bearer ${getState().authenticate_user.auth_token}`
        };
        
        axios.post(url,payload).then((res)=>{
            console.log("Status = ",res.status);
            console.log("Data = ",res.data);

            if(res.status===200){
                if(res.data["status"]==="success"){
                    dispatch(setFetchingRoomScheduleDataSuccess(res.data["data"]));
                }
                else{
                    dispatch(setFetchingRoomScheduleDataFailure(res.data["message"]));
                    checkIfAuthFailed(res);
                }
            }
            else{
                dispatch(setFetchingRoomScheduleDataFailure("Failed to fetch schedule data"));
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(setFetchingRoomScheduleDataFailure(err.message));
        })
    
    }
}

export default fetchRoomsSchedule;