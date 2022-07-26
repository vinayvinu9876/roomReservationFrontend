import axios from 'axios';
import buildUrl from '../../../../utils/buildUrl';
import { addingRoomDownTime, addingRoomDownTimeFailure, addingRoomDownTimeSuccess } from '../viewRoomSlice';
import viewRoom from './viewRoom';


const addRoomDownTime = (room_id,day,start,end,description) => {


    return (dispatch,getState) => {


        dispatch(addingRoomDownTime());

        const url = buildUrl("roomdowntime/create");

        const formdata = new FormData();

        formdata.append("room_id",room_id);
        formdata.append("day",day);
        formdata.append("start",start);
        formdata.append("end",end);
        formdata.append("desc",description);
        formdata.append("status","active");
        formdata.append("authToken" , `Bearer ${getState().authenticate_user.auth_token}`);

        axios.post(url,formdata).then((res)=>{
            console.log("Resposne status = ",res.status," Status text = ",res.statusText);

            if(res.status===200){

                console.log("Response data = ",res.data);

                if(res.data["status"]==="success"){
                    dispatch(addingRoomDownTimeSuccess());
                    dispatch(viewRoom(room_id));
                }
                else{
                    dispatch(addingRoomDownTimeFailure(res.data["message"]));
                    console.log("Failed to add room down time. Message = ",res.data["message"]);
                }
            }
            else{
                console.log("Failed to add room down time");
                dispatch(addingRoomDownTimeFailure("Failed to add room down time. Message "+res.statusText));
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(addingRoomDownTimeFailure(err.message));
        });
    }
}

export default addRoomDownTime;