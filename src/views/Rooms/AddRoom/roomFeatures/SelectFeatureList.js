import React, { useEffect } from 'react';
import { FormSelect } from 'shards-react';
import { useDispatch , useSelector } from 'react-redux';
import { fetchFeatures } from '../../../../store/features/featuresSlice';

const SelectFeatureList = ({onChange}) =>{
    
    const dispatch = useDispatch();

    const loading = useSelector(state => state.features.loading);
    const errMessage = useSelector(state => state.features.errMessage);
    const featuresData = useSelector(state => state.features.featuresData);

    useEffect(()=>{
        if(featuresData.length===0){
            dispatch(fetchFeatures());
        }
    },[]);

    return (
        <FormSelect
        onChange={(evt) => {
            onChange(evt.target.value);
            //dispatch(setFieldValue({fieldName:"status",value:evt.target.value}));
        }}>
            { (!loading) && (!errMessage) && <option value={null}>Choose ...</option>}
            { (loading) && <option value={null}>Loading...</option> }
            { (!loading) && (errMessage) && <option value={null}>{errMessage}</option> }

            {
                featuresData.map((val,index)=>{
                    return <option value={val["id"]}>{val["feature_name"]}</option>
                })
            }
        </FormSelect>
    )
}


export default SelectFeatureList;