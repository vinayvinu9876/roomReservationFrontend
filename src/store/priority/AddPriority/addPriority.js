import axios from "axios";
import toast from "react-hot-toast";
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

        if(!priorityData.role_ids){
            dispatch(addPriorityFailed('Please add role ids'));
            return;
        }

        const formdata = new FormData();

        formdata.append("name",priorityData.name);
        formdata.append("desc",priorityData.desc);
        formdata.append("priority_no",priorityData.priority_no);
        formdata.append("status",priorityData.status);
        formdata.append("role_ids",priorityData.role_ids);

        axios.post(url,formdata).then((res)=>{

            if(res.status===200){

                if(res.data["status"]==="success"){
                    toast.success("Priority added succesfully");
                    dispatch(addPrioritySuccess(res.data["data"]));
                }
                else{
                    toast.error(res.data["message"]);
                    dispatch(addPriorityFailed(res.data["message"]));
                }

            }
            else{
                toast.error("Failed to add priority");
                dispatch(addPriorityFailed("Failed to add priority "+res.statusText));
            }

        }).catch((err)=>{
            console.error(err);
            dispatch(addPriorityFailed(err.message));
        });

    }

}

export default addPriority;