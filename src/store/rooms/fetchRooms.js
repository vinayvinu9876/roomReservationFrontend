import axios from "axios";
import buildUrl from "../../utils/buildUrl";
import { setFetchingRooms, setFetchingRoomsSuccesful,setFetchingRoomsFailure } from "./roomsSlice";

const fetchRooms = (pageNo) =>{
    return (dispatch,getState)=>{

        const searchText = getState().rooms.searchText;

        if(!pageNo){
            pageNo = 1;
        }

        const payload = {
            searchText : searchText ? searchText : null
        };

        const url = buildUrl(`room/get_admin_rooms/${pageNo}`);
        dispatch(setFetchingRooms());

        axios.post(url,payload).then((res)=>{ 
            console.log("response = ",res.data);
            if(res.status === 200){
                if(res.data["status"]==="success"){
                    dispatch(setFetchingRoomsSuccesful(res.data["data"]));
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
