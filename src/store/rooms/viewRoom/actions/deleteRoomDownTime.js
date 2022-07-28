import axios from 'axios';
import buildUrl from "../../../../utils/buildUrl";
import checkIfAuthFailed from '../../../../utils/onAuthFailed';
import { removingDownTimeFailure, removingDownTimeSuccess, removingRoomDownTime   } from '../viewRoomSlice';
import viewRoom from './viewRoom';

const deleteRoomDowntime = (room_id,down_time_id) => {

    return (dispatch,getState) => {

        dispatch(removingRoomDownTime());

        const url = buildUrl(`roomdowntime/delete/${down_time_id}`);
        
        const payload = {
            "authToken" : `Bearer ${getState().authenticate_user.auth_token}`
        };

        axios.post(url,payload).then((res)=>{   

            if(res.status===200){

                if(res.data["status"]==="success"){
                    dispatch(removingDownTimeSuccess());
                    dispatch(viewRoom(room_id));
                }
                else{
                    dispatch(removingDownTimeFailure(res.data["message"]));
                    checkIfAuthFailed(res);
                }

            }
            else{
                dispatch(removingDownTimeFailure("Failed to remove room down time"));
            }

        }).catch((err)=>{
            console.error(err);
            dispatch(removingDownTimeFailure(err.message));
        })

    }

}

export default deleteRoomDowntime;