import React, {useState} from "react";
import { Col, Button, Modal, ModalBody, ModalHeader, FormInput, FormSelect } from "shards-react";
import editPriority from "../../store/priority/EditPriority";
import { useDispatch } from "react-redux/es/exports";


const EditPriority = (
    {   
        id,
        priority_no,
        role_ids,
        name,
        desc,
        status
    }
) =>{

    const dispatch = useDispatch();

    const [open,setOpen] = useState(false);

    const [roleIDs,setRoleIDs] = useState(role_ids);
    const [name_edited , setName] = useState(name);
    const [desc_edited , setDesc] = useState(desc);
    const [status_edited , setStatus] = useState(status);

    const toggle = () => {
        setOpen(!open);
    }

    const editOnClick = () => {
        dispatch(editPriority({
            id : id,
            role_ids : roleIDs,
            priority_no : priority_no,
            name : name_edited,
            desc : desc_edited,
            status : status_edited
        }));
    }
    

    return (
        <div>
            <Button onClick={toggle} type="primary">Edit</Button>
            <Modal open={open} toggle={toggle}>
                <ModalHeader>Edit Priority {priority_no}</ModalHeader>
                <ModalBody style={{margin:0,padding:5}}>
                    <Col style={{marginTop:"10px"}}>
                        <label>Role IDs</label>
                        <FormInput  
                            type="text" 
                            placeholder="Role IDs"
                            value={roleIDs}
                            onChange={(e)=>{setRoleIDs(validateRoleIds(e.target.value))}}
                        />
                    </Col>
                    
                    <Col style={{marginTop:"10px"}}>
                        <label>Name</label>
                        <FormInput 
                            type="text" 
                            placeholder="Name"
                            value={name_edited}
                            onChange={e=>setName(e.target.value)}
                             />
                    </Col>
                    
                    <Col style={{marginTop:"10px"}}>
                        <label>Desc</label>
                        <FormInput 
                            type="text" 
                            placeholder="Desc"
                            value={desc_edited}
                            onChange={e=>setDesc(e.target.value)} 
                        />
                    </Col>
                    
                    <Col style={{marginTop:"10px"}}>
                        <label>Status</label>
                        <FormSelect value={status_edited} onChange={e=>setStatus(e.target.value)}>
                            <option>Choose ...</option>
                            <option value="active">Active</option>
                            <option value="inactive">In-Active</option>
                        </FormSelect>
                    </Col>
                    
                    <Col style={{marginTop:"10px",marginBottom:"10px"}}>
                        <Button theme="primary" onClick={editOnClick}>Edit</Button>
                        <Button style={{marginLeft:"10px"}} theme="danger" onClick={toggle}>Cancel</Button>
                    </Col>
                </ModalBody>
            </Modal>
      </div>
    )
}

const validateRoleIds = (role_ids) => {
    if(role_ids){
        if(isNaN(role_ids[role_ids.length-1]) && (role_ids[role_ids.length-1]!==',') ){
            return role_ids.substring(0,role_ids.length-1);
        }
    }

    return role_ids;
}

export default EditPriority;
