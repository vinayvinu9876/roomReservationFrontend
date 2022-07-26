import axios from 'axios';
import buildUrl from '../../../../utils/buildUrl';
import { addingFeature, addingFeatureFailure, addingFeatureSuccess } from '../viewRoomSlice';
import viewRoom from './viewRoom';

const addFeature  = (feature_id,room_id,total_items) =>{

    return (dispatch,getState) => {


        dispatch(addingFeature());

        const url = buildUrl("roomfeatures/create");

        const formdata = new FormData();
        
        formdata.append("feature_id",feature_id);
        formdata.append("room_id",room_id);
        formdata.append("total_available",total_items);
        formdata.append("status","active"); // constant
        formdata.append("authToken" , `Bearer ${getState().authenticate_user.auth_token}`);

        axios.post(url,formdata).then((res)=>{
            console.log("status code = ",res.status," Status text = ",res.statusText);
            if(res.status===200){
                console.log("Response data = ",res.data);
                if(res.data["status"]==="success"){
                    dispatch(addingFeatureSuccess());
                    dispatch(viewRoom(room_id));
                }
                else{
                    dispatch(addingFeatureFailure(res.data["message"]));
                    console.log("Failure Message = ",res.data["message"]);
                }
            }
            else{
                dispatch(addingFeatureFailure("Failed to add feature"));
                console.log("failure with status code ",res.status," Status rext = ",res.statusText);
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(addingFeatureFailure(err.message));
        })

    }

}

export default addFeature;