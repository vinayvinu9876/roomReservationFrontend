import axios from "axios";
import toast from 'react-hot-toast';
import buildUrl from "../../../utils/buildUrl";
import { editingPriority, editingPriorityFailure, editingPrioritySuccess, fetchPriority } from "../prioritySlice";

const editPriority = ({id,role_ids,priority_no,name,desc,status}) =>{

    return (dispatch,getState) => {

        if(!id){    
            toast.error("Id is not valid");
            return;
        }

        if(!name){
            toast.error("Please add valid name");
            return;
        }

        if(!desc){
            toast.error("Please add valid description");
            return;
        }

        if(!status){
            toast.error("Please select a valid status");
            return;
        }   

        let role_ids_array = role_ids.split(",");

        for(let i=0;i<role_ids_array.length;i++){
            if(isNaN(role_ids_array[i]) || role_ids_array[i].includes(".")){
                toast.error("Role ids is not valid");
                return;
            }
        }

        dispatch(editingPriority());

        const payload = {
            name : name,
            desc : desc,
            priority_no : priority_no,
            role_ids : role_ids,
            status : status ,
            "authToken" : `Bearer ${getState().authenticate_user.auth_token}`
        };

        console.log("Payload = ",payload);

        const url = buildUrl(`priority/update/${id}`);

        axios.post(url,payload).then((res)=>{
            console.log("Response = ",res);
            if(res.data["status"]==="success"){
                toast.success("Edit Priority Succesful");
                dispatch(editingPrioritySuccess());
                dispatch(fetchPriority());
            }
            else{
                toast.error(res.data["message"]);
                dispatch(editingPriorityFailure(res.data["message"]));
            }
        }).catch((err)=>{
            console.error(err);
            toast.error(err.message);
            dispatch(editingPriorityFailure(err.message));
        })

    }

}

export default editPriority;