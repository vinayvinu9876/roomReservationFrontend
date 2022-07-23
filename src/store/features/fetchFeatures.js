import axios from "axios";
import buildUrl from "../../utils/buildUrl";
import { setFetchingFeatures, setFetchingFeaturesFailed,setFetchingFeaturesSuccess } from "./featuresSlice";

const fetchFeatures = (pageNo) =>{

    return (dispatch,getState)=>{

        if(!pageNo){
            pageNo = 1;
        }

        const payload = {
            "search" : null,
            "status" : null,
        };

        if(getState().features.search){
            payload["search"] = getState().features.search;
        }

        if(getState().features.status){
            payload["status"] = getState().features.status;
        }
        
        const url = buildUrl(`features/read/${pageNo}`);

        dispatch(setFetchingFeatures());

        axios.post(url,payload).then((res)=>{
            console.log("response = ",res);
            if(res.status===200){

                console.log("Response data = ",res.data);
                console.log("Feature data = ",res.data["data"]);

                if(res.data["status"]==="failure"){
                    dispatch(setFetchingFeaturesFailed(res.data["message"]));
                    return;
                }

                dispatch(setFetchingFeaturesSuccess(res.data["data"]));
                return;   
            }
            else{
                dispatch(setFetchingFeaturesFailed(res.statusText));
            }
        }).catch((err)=>{
            console.error(err);
            dispatch(setFetchingFeaturesFailed(err.message));
        })
    }

}


export default fetchFeatures;