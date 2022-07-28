import axios from "axios";
import buildUrl from "../../../utils/buildUrl";
import checkIfAuthFailed from "../../../utils/onAuthFailed";
import { setAddingFeature,setAddingFeatureSuccess,setAddingFeatureFailed } from "./addFeatureSlice";


const addFeature = () =>{

    return (dispatch,getState)=>{

        const url = buildUrl("features/create");

        const featureData = getState().addFeature;

        console.log("Feature data = ",featureData);

        dispatch(setAddingFeature());

        if(!featureData.feature_name){
            dispatch(setAddingFeatureFailed("Please add feature name"));
            return;
        }

        if(!featureData.feature_desc){
            dispatch(setAddingFeatureFailed("Please add feature desc"));
            return;
        }

        if(!featureData.total_available){
            dispatch(setAddingFeatureFailed("Please add total available"));
            return;
        }

        if(!featureData.status){
            dispatch(setAddingFeatureFailed("Please add status"));
            return;
        }

        var formdata = new FormData();

        formdata.append("feature_name",featureData.feature_name);
        formdata.append("feature_desc",featureData.feature_desc);
        formdata.append("total_available",featureData.total_available);
        formdata.append("status",featureData.status);
        formdata.append("authToken",`Bearer ${getState().authenticate_user.auth_token}`);
        

        axios.post(url,formdata).then((res)=>{
            
            console.log('Res status text = ',res.statusText);

            if(res.status===200){

                if(res.data["status"]==="success"){
                    dispatch(setAddingFeatureSuccess());
                }   
                else{
                    dispatch(setAddingFeatureFailed(res.data["message"]));
                    checkIfAuthFailed(res);
                }

            }
            else{
                dispatch(setAddingFeatureFailed("Failed to add feature "+res.statusText));
            }

        }).catch((err)=>{
            console.error(err);
            dispatch(setAddingFeatureFailed(err.message));
        })
    }

}

export default addFeature;