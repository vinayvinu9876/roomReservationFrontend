import axios from "axios";
import buildUrl from "../../../utils/buildUrl";
import checkIfAuthFailed from "../../../utils/onAuthFailed";
import { setAddingRoom,setAddingRoomFailed,setAddingRoomSuccess } from "./addRoomSlice";    

const addRoom = () => {
    return (dispatch,getState)=>{

        dispatch(setAddingRoom());

        const url = buildUrl("room/create");

        const state = getState().addRoom;

        const payload = {
            room_name : state.room_name,
            room_desc : state.room_desc,
            room_capacity :state.room_capacity,
            status : state.status,

            room_images : state.room_images,
            room_features : state.room_features,
            room_down_time : state.room_down_time,

            "authToken" : `Bearer ${getState().authenticate_user.auth_token}`
        };

        console.log("Payload=  ",payload);


        if(!payload.room_name){
            dispatch(setAddingRoomFailed("Room name is not valid"));
            return;
        }

        if(!payload.room_desc){
            dispatch(setAddingRoomFailed("Room desc is not valid"));
            return;
        }

        if(!payload.room_capacity){
            dispatch(setAddingRoomFailed("Room capacity is not valid"));
            return;
        }
    
        if(!payload.status){
            dispatch(setAddingRoomFailed("Status is not valid"));
            return;
        }

        if(!payload.room_images.length===0){
            dispatch(setAddingRoomFailed("Please add atleast one image"));
            return;
        }

        var formdata = new FormData();

        formdata.append("room_name",payload.room_name);
        formdata.append("room_desc",payload.room_desc);
        formdata.append("room_capacity",payload.room_capacity);
        formdata.append('status',payload.status);

        formdata.append("room_images",JSON.stringify(payload.room_images));
        formdata.append("room_features",JSON.stringify(payload.room_features));
        formdata.append("room_down_time",JSON.stringify(payload.room_down_time));

        axios.post(url,formdata).then((res)=>{

            if(res.status===200){
                if(res.data["status"]==="failure"){
                    dispatch(setAddingRoomFailed(res.data["message"]));
                    checkIfAuthFailed(res);
                    return;
                }

                dispatch(setAddingRoomSuccess("Add room succesfull"));
                return;
            }   
            else{
                dispatch(setAddingRoomFailed(res.statusText));
            }

        })  
        .catch((err)=>{
            console.error(err);
            dispatch(setAddingRoomFailed(err.message));
        })
    }
}

export default addRoom;