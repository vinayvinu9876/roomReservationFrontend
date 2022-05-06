import axios from "axios";
import buildUrl from "../../../utils/buildUrl";
import { addingPriority,addPrioritySuccess,addPriorityFailed  } from "./addPrioritySlice";

const addPriority = () =>{

    return (dispatch,getState)=>{

        dispatch(addingPriority());

        const url = buildUrl("priority/create");

        const priorityData = getState().addPriority;

        if(!priorityData.name){
            dispatch(addPriorityFailed("Please add Name"));
            return;
        }

        if(!priorityData.desc){
            dispatch(addPriorityFailed("Please add description"));
            return;
        }

        if(!priorityData.priority_no){
            dispatch(addPriorityFailed("Please add a priority no"));
            return;
        }

        if(!priorityData.status){
            dispatch(addPriorityFailed("Please add status"));
            return;
        }

        const formdata = new FormData();

        formdata.append("name",priorityData.name);
        formdata.append("desc",priorityData.desc);
        formdata.append("priority_no",priorityData.priority_no);
        formdata.append("status",priorityData.status);

        axios.post(url,formdata).then((res)=>{

            if(res.status===200){

                if(res.data["status"]==="success"){
                    dispatch(addPrioritySuccess(res.data["data"]));
                }
                else{
                    dispatch(addPriorityFailed(res.data["message"]));
                }

            }
            else{
                dispatch(addPriorityFailed("Failed to add priority "+res.statusText));
            }

        }).catch((err)=>{
            console.error(err);
            dispatch(addPriorityFailed(err.message));
        });

    }

}

export default addPriority;