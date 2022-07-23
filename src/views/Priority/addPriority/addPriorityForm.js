import React from "react";
import {
    Row,
    Col,
    Form,
    FormInput,
    FormSelect,
    FormGroup,
    Button } from "shards-react";
import {useDispatch,useSelector} from 'react-redux';
import { AtomSpinner } from "react-epic-spinners";
import { setFieldValue , addPriority} from "../../../store/priority/AddPriority/addPrioritySlice";
import { Link } from "react-router-dom";


const AddPriorityForm = ()=>{
    const dispatch = useDispatch();

    const loading = useSelector(state=>state.addPriority.loading);
    const errMessage = useSelector(state=>state.addPriority.errMessage);
    const successMessage = useSelector(state=>state.addPriority.successMessage);

    const name = useSelector(state=>state.addPriority.name);
    const desc = useSelector(state=>state.addPriority.desc);
    const role_ids = useSelector(state=>state.addPriority.role_ids);
    const priority_no = useSelector(state=>state.addPriority.priority_no);
    const status = useSelector(state=>state.addPriority.status);

        return (
            <>
            {
            (!loading) &&
            <Form>
                {
                    (errMessage) &&
                    <p style={{color:"red"}}>{errMessage}</p>
                }
                {
                    (successMessage) &&
                    <p style={{color:"green"}}>{successMessage}</p>
                }
                <FormGroup>
                    <label>Priority Name</label>
                    <FormInput
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(evt) => {
                            dispatch(setFieldValue({fieldName:"name",value:evt.target.value}));
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Description</label>
                    <FormInput
                        type="text"
                        placeholder="Priority desc"
                        value={desc}
                        onChange={(evt) => {
                            dispatch(setFieldValue({fieldName:"desc",value:evt.target.value}));
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Role IDs</label>
                    <FormInput
                        type="text"
                        placeholder="Role IDs"
                        value={role_ids}
                        onChange={(evt) => {
                            dispatch(setFieldValue({fieldName:"role_ids",value:evt.target.value}));
                        }}
                    />
                </FormGroup>
                <Row form>
                    <Col md="7">
                        <label>Priority Value</label>
                        <FormInput 
                            placeholder={"Lowest no. will have highest priority"}
                            value={priority_no} 
                            type="number" 
                            onChange={(evt) => {
                                dispatch(setFieldValue({fieldName:"priority_no",value:evt.target.value}));
                            }}/>
                    </Col>
                    <Col md="5" className="form-group">
                        {/*active,inactive,under_maintenance,cleaning,temporarily_unavailable,permanently_unavailable*/}
                        <label>Status</label>
                        <FormSelect
                            value={status} 
                            onChange={(evt) => {
                                dispatch(setFieldValue({fieldName:"status",value:evt.target.value}));
                            }}>
                            <option>Choose ...</option>
                            <option value="active">Active</option>
                            <option value="inactive">In-Active</option>
                        </FormSelect>
                    </Col>
                </Row>
                <Row form>
                    <Col>
                        <Button theme="primary" onClick={()=>{dispatch(addPriority())}}>Add New Room</Button>
                        <Link to="/priority"><Button theme="danger" style={{marginLeft:"10px"}}>Cancel</Button></Link>
                    </Col>
                </Row>

            </Form>
            }
            {
                (loading) &&
                <center>
                    <AtomSpinner  color={"blue"} />
                </center>
            }
        </>
        )
    
}

export default AddPriorityForm;