import React, { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Button, FormInput } from "shards-react";
import fetchRooms from "../../store/rooms/fetchRooms";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import Pagination from '../../components/Pagination/pagination';
import PageTitle from "../../components/common/PageTitle";
import { AtomSpinner } from "react-epic-spinners";
import {setSearchText} from '../../store/rooms/roomsSlice';

const Rooms = () =>{
  const dispatch = useDispatch();

  const roomsData = useSelector(state=>state.rooms.rooms);
  const loading = useSelector(state=>state.rooms.loading);
  const errMessage = useSelector(state=>state.rooms.errMessage);

  const start = useSelector(state=>state.rooms.start);
  const end = useSelector(state=>state.rooms.end);
  const currentPageNo = useSelector(state=>state.rooms.currentPageNo);
  const totalPages = useSelector(state=>state.rooms.totalPages);
  const totalResults = useSelector(state=>state.rooms.totalResults);

  useEffect(()=>{
    dispatch(fetchRooms());
  },[]);

  return (

    <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Rooms" subtitle="Manage" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <SearchBar />
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Rooms</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            {
              (loading) &&
              <div style={{width:"100%",height:"200px",padding:"20px"}}>
                <center><AtomSpinner color={"blue"} /></center>
              </div>
            }
            {
              (!loading) && (errMessage) &&
              <div style={{width:"100%",height:"200px",padding:"20px"}}>
                <center><p style={{color:"red"}}>{errMessage}</p></center>
              </div>
            }
            {
              (!loading) && (!errMessage) &&
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
                    Updated on
                  </th>
                  <th scope="col" className="border-0">
                    Status
                  </th>
                  <th scope="col" className="border-0">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  roomsData.map((val,index)=>{
                    return (
                      <tr>
                        <td>{start+index}</td>
                        <td>{val["room_name"]}</td>
                        <td>{val["room_capacity"]}</td>
                        <td>{val["updated_at"]}</td>
                        <td style={val["status"]==="inactive"?{color:"red"}:{}}>{val["status"].toUpperCase()}</td>
                        <td><Link to={`/viewRoom?room_id=${val["room_id"]}`}><Button theme="primary">View</Button></Link></td>
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
          totalResults={totalResults} 
          totalPages={totalPages} 
          activePageNo={parseInt(currentPageNo)} 
          onPageClick={(pageNo)=>{dispatch(fetchRooms(pageNo))}} 
        />
      </Col>
    </Row>
    </Container>
   
  );
}


const SearchBar = () => {
  
  const dispatch = useDispatch();

  return (
    <Row style={{marginBottom:15}}>
        <Col>
          <Row>
            <Col md={4} lg={4} sm={8} xs={8} >
              <label>Search</label>
              <FormInput type="text" placeholder="Search..." onChange={(evt)=>{dispatch(setSearchText(evt.target.value))}} />
            </Col>
            <Col md={2} lg={2} sm={4} xs={4} style={{paddingTop:"30px"}}>
                <Button 
                  type="primary"
                  onKeyPress={(e) => {
                    console.log("Key = " ,e.key);
                    if(e.key==='Enter'){
                        dispatch(fetchRooms());
                    }
                  }} 
                  onClick={()=>{dispatch(fetchRooms())}}
                  >
                    <i class="material-icons">search</i>
                </Button>
            </Col>
          </Row>
        </Col>
    </Row>
  )

}

/*
    <CustomTablePage 
      pageName={"Rooms"} 
      columns={columns} 
      loading={loading} 
      errMessage={errMessage} 
      data={roomsData}
      child={ <Link to="/addRoom"><Button>Add New Room</Button></Link> }
    />
*/

export default Rooms;
