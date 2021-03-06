import React, { useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody,Button } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import { AtomSpinner } from "react-epic-spinners";
import { useDispatch,useSelector } from 'react-redux';
import { getReservedMeetingList } from '../../store/reservedMeetingList/reservedMeetingListSlice';
import Pagination from '../../components/Pagination/pagination';
import SearchBar from './searchBar';
import {cancelMeeting} from '../../store/reservedMeetingList/reservedMeetingListSlice';
import  { Toaster } from 'react-hot-toast';

const ReservedMeetingView = () =>{

    const dispatch = useDispatch();

    const loading = useSelector(state=>state.reservedMeetingList.loading);
    const errMessage = useSelector(state=>state.reservedMeetingList.errMessage);
    const meetingList = useSelector(state=>state.reservedMeetingList.meetingList);
    const pageNo = useSelector(state=>state.reservedMeetingList.pageNo);
    const totalResult = useSelector(state=>state.reservedMeetingList.totalResult);
    const totalPages = useSelector(state=>state.reservedMeetingList.totalPages);
    const startIndex = useSelector(state=>state.reservedMeetingList.startIndex);
    const endIndex = useSelector(state=>state.reservedMeetingList.endIndex);


    useEffect(()=>{
        dispatch(getReservedMeetingList(1));
    },[]);

    return (
        <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title={"Meeting List"} subtitle={"Manage"} className="text-sm-left" />
            </Row>
            <Toaster />
            {/* Default Light Table */}
            <Row>
                <Col>
                    <SearchBar />

                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">Meeting List</h6>
                        </CardHeader>
                        <CardBody className="p-0 pb-3">
                            {
                                (loading) &&
                                <div style={{height:"200px",width:"100%",padding:"20px"}}>
                                    <center><AtomSpinner color={"blue"}/></center>
                                </div>
                            }
                            {
                                (!loading) && (errMessage) &&
                                <div style={{width:"100%",padding:"20px"}}>
                                    <center><p style={{color:"red"}}>{errMessage}</p></center>
                                </div>
                            }
                            {
                                (!loading) && (!errMessage) && (meetingList.length===0) &&
                                <div style={{width:"100%",padding:"20px",paddingTop:"50px"}}>
                                    <center><p style={{color:"red"}}>No meetings yet</p></center>
                                </div>
                            }
                            {
                                (!loading) && (!errMessage) && (meetingList) && (meetingList.length>0) &&
                            <table className="table mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th scope="col" className="border-0">
                                        #
                                    </th>
                                    <th scope="col" className="border-0">
                                        Room Name
                                    </th>
                                    <th scope="col" className="border-0">
                                        Meeting Title
                                    </th>
                                    <th scope="col" className="border-0">
                                        Organized By
                                    </th>  
                                    <th scope="col" className="border-0">
                                        Reserved By
                                    </th>                                    
                                    <th scope="col" className="border-0">
                                        Date
                                    </th>
                                    <th scope="col" className="border-0">
                                        Time
                                    </th>
                                    <th scope="col" className="border-0">
                                        Status
                                    </th>                          
                                    <th scope="col" className="border-0">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    meetingList.map((val,index)=>{
                                        let reservation_id = val["reservation_id"];
                                        return (
                                            <tr>
                                                <td>{startIndex+index}</td>
                                                <td>{val["room_name"]}</td>
                                                <td>{val["meeting_title"]}</td>
                                                <td>{val["headed_by"]}</td>
                                                <td>{val["reserved_by_name"]} <br /> {val["reserved_by_email"]}</td>
                                                <td>{new Date(val["start_timestamp"]).toDateString()}</td>
                                                <td>{new Date(val["start_timestamp"]).toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})} to {new Date(val["end_timestamp"]).toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})}</td>
                                                <td style={val["status"]==="cancelled"?{color:"red"}:{}}>{val["status"]}</td>
                                                <td>
                                                    {
                                                        (new Date() < new Date(val["start_timestamp"])) && (val["status"]!=="cancelled") &&
                                                        <Button theme="primary" onClick={()=>{dispatch(cancelMeeting(reservation_id))}}>Cancel</Button>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                            }
                        </CardBody>
                    </Card>
                    <Pagination 
                        totalPages={totalPages} 
                        activePageNo={pageNo} 
                        start={startIndex} 
                        end={endIndex} 
                        totalResults={totalResult}
                        onPageClick={(pageNo)=>{dispatch(getReservedMeetingList(pageNo));}}
                    />
                </Col>
            </Row>
        </Container>
    );

}

export default ReservedMeetingView;