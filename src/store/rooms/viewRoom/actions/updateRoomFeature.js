import buildUrl from '../../../../utils/buildUrl';
import toast from 'react-hot-toast';
import { updatingRoomFeature,  updatingRoomFeatureSuccess, updatingRoomFeatureFailed, /*viewRoom*/ } from '../viewRoomSlice';
import axios from 'axios';

const updateRoomFeature = (room_id,room_feature_id,value) => {

    return (dispatch,getState)=>{   

        if(!room_feature_id){
            toast.error("Room feature id not found");
            return;
        }

        if(!value || value===0){
            toast.error("Value to add or remove is not valid");
            return;
        }

        dispatch(updatingRoomFeature());

        const url = buildUrl(`roomfeatures/add_or_remove/${room_feature_id}`);

        const payload = { 
            room_feature_id : room_feature_id,
            value
        };  

        axios.post(url,payload).then((res)=>{
            console.log("res status = ",res.status," Status text = ",res.statusText);
            if(res.status===200){
                if(res.data["status"]==="success"){
                    toast.success("Room feature value updated succesfully");
                    dispatch(updatingRoomFeatureSuccess());
                    //dispatch(viewRoom(room_id));
                }
                else{
                    toast.error(res.data["message"]);
                    dispatch(updatingRoomFeatureFailed(res.data["message"]));
                }
            }
            else{
                dispatch(updatingRoomFeatureFailed("Failed to update feature. "+res.statusText));
            }
            
            
        }).catch((err)=>{
            console.error(err);
            toast.error(err.message);
            dispatch(updatingRoomFeatureFailed(err.message));
        })

    }

}

export default updateRoomFeature;