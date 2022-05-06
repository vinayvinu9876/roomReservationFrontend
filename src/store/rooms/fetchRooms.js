import axios from "axios";
import buildUrl from "../../utils/buildUrl";
import { setFetchingRooms, setFetchingRoomsSuccesful,setFetchingRoomsFailure } from "./roomsSlice";

const fetchRooms = () =>{
    return (dispatch,getState)=>{
        const url = buildUrl("room/read");
        dispatch(setFetchingRooms());
        axios.post(url).then((res)=>{ 
            if(res.status === 200){
                if(res.data["status"]==="success"){
                    dispatch(setFetchingRoomsSuccesful(res.data["data"]["rooms"]));
                }
                else{
                    dispatch(setFetchingRoomsFailure(res.data["message"]));
                }
            }
            else{
                dispatch(setFetchingRoomsFailure(res.statusText));
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(setFetchingRoomsFailure(err.message));
        })

    }

}

export default fetchRooms;
