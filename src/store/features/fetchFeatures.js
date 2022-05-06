import axios from "axios";
import buildUrl from "../../utils/buildUrl";
import { setFetchingFeatures, setFetchingFeaturesFailed,setFetchingFeaturesSuccess } from "./featuresSlice";

const fetchFeatures = () =>{

    return (dispatch,getState)=>{
        const url = buildUrl("features/read");

        dispatch(setFetchingFeatures());

        axios.post(url).then((res)=>{
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