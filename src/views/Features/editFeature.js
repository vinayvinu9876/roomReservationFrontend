import React,{useState} from "react";
import { Modal , ModalHeader, ModalBody, Button,Col,FormInput, FormSelect  } from "shards-react";
import { useDispatch } from "react-redux/es/exports";
import { editFeature } from "../../store/features/featuresSlice";


const EditFeatureModal = ({featureData}) =>{

    const dispatch = useDispatch();
  
    const [open,setOpen] = useState(false);
    
    const [feature_name,setFeatureName] = useState(featureData["feature_name"]);
    const [feature_desc,setFeatureDesc] = useState(featureData["feature_desc"]);
    const [totalAvailable,setTotalAvailable] = useState(featureData["total_available"]);
    const [status,setStatus] = useState(featureData["status"]);
   
    const toggle = () =>{
      setOpen(!open);
    }
  
    const onClickEditFeature = () => {
        dispatch(editFeature(featureData["id"],feature_name,feature_desc,totalAvailable,status));
    }
  
    return (
      <div>
        <Button  onClick={toggle}><i class="material-icons">edit</i></Button>
        <Modal open={open} toggle={toggle}>
          <ModalHeader>Edit Feature</ModalHeader>
          <ModalBody>
            <Col style={{padding:0,margin:0}}>
              <Col style={{padding:0,margin:0}}>
                <label>Feature Name</label>
                <FormInput type="text"  
                            placeholder="Feature Name"
                            value={feature_name}
                            onChange={(evt)=>{setFeatureName(evt.target.value)}}
                            />
              </Col>
              
              <Col style={{padding:0,margin:0,marginTop:"10px"}}>
                <label>Feature Desc</label>
                <FormInput type="text" 
                            placeholder="Feature Name"
                            value={feature_desc}
                            onChange={(evt)=>{setFeatureDesc(evt.target.value)}}/>
              </Col>
  
              <Col style={{padding:0,margin:0,marginTop:"10px"}}>
                <label>Total Available</label>
                <FormInput type="number" 
                            placeholder="Total Available"
                            value={totalAvailable}
                            onChange={(evt)=>setTotalAvailable(evt.target.value)}/>
              </Col>
  
              <Col style={{padding:0,margin:0,marginTop:"10px"}}>
                <label>Status</label>
                <FormSelect value={status} onChange={(evt)=>{setStatus(evt.target.value)}}>
                    <option value={null}>Choose ...</option>
                    <option value="active">Active</option>
                    <option value="maintenance">Under Maintenance</option>
                    <option value="permanently_unavailable">Permanently Unavailable</option>
                </FormSelect>
              </Col>
  
              <Button onClick={()=>{onClickEditFeature()}} style={{marginTop:"15px"}}>Edit</Button>
            </Col>
  
          </ModalBody>
        </Modal>
      </div>
    )
  }

  export default EditFeatureModal