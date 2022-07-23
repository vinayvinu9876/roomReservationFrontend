import React from "react";
import {Button,FormInput,Row,Col,FormSelect} from 'shards-react';
import { useSelector , useDispatch } from "react-redux/es/exports";
import {getReservedMeetingList} from "../../store/reservedMeetingList/reservedMeetingListSlice";
import { setSearchText, setStartDate, setEndDate, setRoomId, setSortId } from "../../store/reservedMeetingList/reservedMeetingListSlice";
import RoomSelect from "../../components/RoomSelect";

const SearchBr = () => {

    const dispatch = useDispatch();

    const searchText    = useSelector(state=>state.reservedMeetingList.searchText);
    let startDate     = useSelector(state=>state.reservedMeetingList.start);
    let endDate       = useSelector(state=>state.reservedMeetingList.end);
    const room_id       = useSelector(state=>state.reservedMeetingList.room_id);
    const sort_id       = useSelector(state=>state.reservedMeetingList.sort);

    if(startDate){
        startDate = new Date(startDate).toISOString().split("T")[0];
    }

    if(endDate){
        endDate = new Date(endDate).toISOString().split("T")[0];
    }

    return (
        <Col style={{padding:"0px",margin:"0px",marginBottom:"15px",marginTop:"15px"}}>
        <Row>
            <Col lg={3} md={3} sm={12} xs={12} >
                <strong className="text-muted d-block mb-2">Search</strong>
                <FormInput type={"text"} onChange={(evt)=>{dispatch(setSearchText(evt.target.value));}} placeholder="Search..." value={searchText} />
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
                <Row>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <strong className="text-muted d-block mb-2">Start</strong>
                        <FormInput value={startDate} type={"date"} onChange={evt=>dispatch(setStartDate(evt.target.value))}/>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <strong className="text-muted d-block mb-2">End</strong>
                        <FormInput value={endDate} type={"date"} onChange={evt=>dispatch(setEndDate(evt.target.value))}/>
                    </Col>
                </Row>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
                <Row>
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <strong className="text-muted d-block mb-2">Room</strong>
                        <RoomSelect val={room_id} onChange={value=>dispatch(setRoomId(value))} />
                        
                    </Col>
                    
                    <Col lg={6} md={6} sm={12} xs={12}>
                        <strong className="text-muted d-block mb-2">Sort</strong>
                        <FormSelect  id="feInputState" value={sort_id ? sort_id.toString() : ""} onChange={evt=>{dispatch(setSortId(evt.target.value))}}>
                            <option value={"1"}>Date Ascending</option>
                            <option value={"2"}>Date Descending</option>
                        </FormSelect>
                    </Col>
                </Row>
            </Col>
            <Col lg={1} md={1} sm={12} xs={12}>
                <div style={{marginTop:"30px"}}>
                    <Button theme="primary" onClick={()=>{dispatch(getReservedMeetingList(1))}}><i class='material-icons'>search</i></Button>
                </div>
            </Col>
        </Row>
        </Col>
    )
}



export default SearchBr;