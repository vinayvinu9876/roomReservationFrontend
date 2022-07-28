import React,{useEffect} from 'react';
import { Button } from 'shards-react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import fetchUserRooms from '../../store/UserRooms/fetchUserRooms';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import Pagination from '../../components/Pagination/pagination';
import PageTitle from "../../components/common/PageTitle";
import { AtomSpinner } from "react-epic-spinners";

const UserRooms = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchUserRooms());
    },[]);

    const loading = useSelector(state=>state.userRooms.loading);
    const errMessage = useSelector(state=>state.userRooms.errMessage);
    const roomsData = useSelector(state=>state.userRooms.rooms);

    const start = useSelector(state=>state.userRooms.start);
    const end = useSelector(state=>state.userRooms.end);
    const totalPages = useSelector(state=>state.userRooms.totalPages);
    const currentPageNo = useSelector(state=>state.userRooms.currentPageNo);
    const totalResults = useSelector(state=>state.userRooms.totalResults);

    return (
        <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="Meeting Room" subtitle="Reserve A" className="text-sm-left" />
            </Row>

            {/* Default Light Table */}
            <Row>
            <Col>
                <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Meeting Rooms</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                    {
                        loading &&
                        <div style={{width:"100%",height:"200px",padding:"20px"}}>
                            <center><AtomSpinner color={"blue"} /> </center>
                        </div>
                    }
                    {
                        (!loading) && (errMessage) &&
                        <div style={{width:"100%",height:"200px",padding:"20px"}}>
                            <p style={{color:"red"}}>{errMessage}</p>
                        </div>
                    }
                    {
                        (!loading) && (!errMessage) && (roomsData.length===0) &&
                        <div style={{width:"100%",height:"200px",padding:"20px",paddingTop:"50px"}}>
                            <center><p style={{color:"red"}}>No Rooms available</p></center>
                        </div>
                    }
                    {
                    (!loading) && (!errMessage) && (roomsData.length!==0) &&
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
                            Capacity
                        </th>
                        <th scope="col" className="border-0">
                            Reserve
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roomsData.map((val,index)=>{

                                return (
                                    <tr key={"roomData"+index}>
                                        <td>{start+index}</td>
                                        <td>{val["room_name"]}</td>
                                        <td>{val["room_capacity"]}</td>
                                        <td>
                                            <Link to={`/userRoomView?room_id=${val["room_id"]}`}>
                                                <Button theme="primary">Reserve</Button>
                                            </Link>
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
                    start={start}
                    end={end}
                    totalPages={totalPages}
                    activePageNo={parseInt(currentPageNo)}
                    totalResults={totalResults}
                    onPageClick={
                        (pageNo)=>{dispatch(fetchUserRooms(pageNo));}
                    }
                />
            </Col>
            </Row>

        </Container>
        
    )
}


export default UserRooms;