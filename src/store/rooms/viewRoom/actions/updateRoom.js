import axios from "axios";
import buildUrl from "../../../../utils/buildUrl";
import { updatingRoomData,updateRoomDataSuccess,updateRoomDataFailed } from "../viewRoomSlice";
import viewRoom from "./viewRoom";

const updateRoom = (room_id,payload) =>{

    return (dispatch,getState)=>{

        console.log("Payload = ",payload);

        dispatch(updatingRoomData());

        const url = buildUrl(`room/update/${room_id}`);

        console.log("url = ",url);

        const formdata = new FormData();

        Object.keys(payload).forEach((key)=>{
            formdata.append(key,payload[key]);
        });

        axios.post(url,formdata).then((res)=>{
            console.log("Status = ",res.status," Status text = ",res.statusText);
            if(res.status===200){   
                console.log("Result = ",res.data);
                if(res.data["status"]==="success"){
                    dispatch(updateRoomDataSuccess());
                    dispatch(viewRoom(room_id));
                }       
                else{
                    dispatch(updateRoomDataFailed());
                }
            }
            else{
                dispatch(updateRoomDataFailed("Failed to update room "+res.statusText));
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(updateRoomDataFailed(err.message));
        });
    }
}

const updateRoomName = (room_id,room_name) => {
    return (dispatch,getState) => {

        const payload = {
            "room_name" : room_name
        };

        dispatch(updateRoom(room_id,payload));
    }
}

const updateRoomDesc = (room_id,room_desc) => {
    return (dispatch,getState) => {

        const payload = {
            "room_desc" : room_desc
        };

        dispatch(updateRoom(room_id,payload));
    }
}

const updateRoomCapacity = (room_id,capacity) => {
    return (dispatch,getState) => {

        const payload = {
            "room_capacity" : capacity
        };

        dispatch(updateRoom(room_id,payload));
    }
}

const updateRoomStatus = (room_id,status) => {
    return (dispatch,getState)=> {

        const payload = {
            "status" : status
        };

        dispatch(updateRoom(room_id,payload));
    }
}


export {updateRoomName,updateRoomDesc,updateRoomCapacity,updateRoomStatus};