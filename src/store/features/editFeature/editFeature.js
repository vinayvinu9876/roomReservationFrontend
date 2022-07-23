import axios from 'axios';
import toast from 'react-hot-toast';
import buildUrl from '../../../utils/buildUrl';
import { setEditingFeature, setEditingFeatureFailed, setEditingFeatureSuccess } from '../featuresSlice';
import {fetchFeatures} from '../featuresSlice';

const editFeature = (feature_id,feature_name,feature_desc,total_available,status) => {

    return (dispatch,getState) => {

        if(!feature_name){
            toast.error("Feature name cannot be empty");
            return;
        }
    
        if(!feature_desc){
            toast.error("Feature description cannot be empty");
            return;
        }
    
        if(!total_available && (total_available!==0)){
            toast.error("Total Available cannot be empty");
            return;
        }
    
        if(!status){
            toast.error("Status cannot be empty");
            return;
        }

        dispatch(setEditingFeature());

        const url = buildUrl(`features/update/${feature_id}`);

        const payload = {
            "feature_name" : feature_name,
            "feature_desc": feature_desc,
            "total_available" : total_available,
            "status" : status
        }

        axios.post(url,payload).then((res)=>{
            console.log('respone = ',res);
            if(res.status===200){
                if(res.data["status"]==="success"){
                    toast.success("Feature updated succesfully");
                    dispatch(setEditingFeatureSuccess());
                    dispatch(fetchFeatures());
                }
                else{
                    toast.error(res.data["message"]);
                    dispatch(setEditingFeatureFailed(res.data["message"]));
                }
            }
            else{
                toast.error("Failed to update "+res.statusText);
                dispatch(setEditingFeatureFailed("Failed to update feature. "+res.statusText));
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(setEditingFeatureFailed(err.message));
        })
    }
    
}

export default editFeature;