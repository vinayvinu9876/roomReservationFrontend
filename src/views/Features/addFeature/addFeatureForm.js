import React from "react";
import {
    Row,
    Col,
    Form,
    FormInput,
    FormSelect,
    FormGroup,
    Button } from "shards-react";
import { AtomSpinner } from "react-epic-spinners";
import { setFieldValue , addFeature } from "../../../store/features/addFeature/addFeatureSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AddFeatureForm = () =>{

    const dispatch = useDispatch();

    const loading = useSelector(state=>state.addFeature.loading);
    const errMessage = useSelector(state=>state.addFeature.errMessage);
    const successMessage = useSelector(state=>state.addFeature.successMessage);

    const feature_name = useSelector(state=>state.addFeature.feature_name);
    const feature_desc = useSelector(state=>state.addFeature.feature_desc);
    const total_available = useSelector(state=>state.addFeature.total_available);
    const status = useSelector(state=>state.addFeature.status);

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
                    <label>Feature Name</label>
                    <FormInput
                        type="text"
                        placeholder="Feature name"
                        value={feature_name}
                        onChange={(evt) => {
                            dispatch(setFieldValue({fieldName:"feature_name",value:evt.target.value}));
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Feature Description</label>
                    <FormInput
                        type="text"
                        placeholder="Feature desc"
                        value={feature_desc}
                        onChange={(evt) => {
                            dispatch(setFieldValue({fieldName:"feature_desc",value:evt.target.value}));
                        }}
                    />
                </FormGroup>
                <Row form>
                    <Col md="7">
                        <label>Total Available</label>
                        <FormInput 
                            placeholder={"Total Available"}
                            value={total_available} 
                            type="number" 
                            onChange={(evt) => {
                                dispatch(setFieldValue({fieldName:"total_available",value:evt.target.value}));
                            }}/>
                    </Col>
                    <Col md="5" className="form-group">
                        {/*active,maintenance,permanently_unavailable*/}
                        <label>Status</label>
                        <FormSelect
                            value={status} 
                            onChange={(evt) => {
                                dispatch(setFieldValue({fieldName:"status",value:evt.target.value}));
                            }}>
                            <option>Choose ...</option>
                            <option value="active">Active</option>
                            <option value="maintenance">Under Maintenance</option>
                            <option value="permanently_unavailable">Permanently Unavailable</option>
                        </FormSelect>
                    </Col>
                </Row>
                <Row form>
                    <Col>
                        <Button theme="primary" onClick={()=>{
                            dispatch(addFeature());
                        }}>Add New Feature</Button>
                        <Link to="/features"><Button theme="danger" style={{marginLeft:"10px"}}>Cancel</Button></Link>
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

export default AddFeatureForm;