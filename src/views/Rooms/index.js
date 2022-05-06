import React, { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Button } from "shards-react";
import fetchRooms from "../../store/rooms/fetchRooms";
import { Link } from "react-router-dom";

import CustomTablePage from "../../components/table";


const Rooms = () =>{
  const dispatch = useDispatch();

  const roomsData = useSelector(state=>state.rooms.rooms);
  const loading = useSelector(state=>state.rooms.loading);
  const errMessage = useSelector(state=>state.rooms.errMessage);

  useEffect(()=>{
    dispatch(fetchRooms());
  },[]);

  const columns = [
    {
      name : "#",
      selector : row => row.room_id,
      sortable : false
    },
    {
        name: 'Room Name',
        selector: row => row.room_name,
        sortable: true,
        sortField: 'room_name',
    },
    {
        name: 'Capacity',
        selector: row => row.room_capacity,
        sortable: true,
        sortField: 'capacity',
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
        sortField: 'status',
    },
    {
      name : "Updated on",
      selector : row => row.updated_at,
      sortable : true,
      sortField : "updated_at"
    }
];



  return (
  
    <CustomTablePage 
      pageName={"Rooms"} 
      columns={columns} 
      loading={loading} 
      errMessage={errMessage} 
      data={roomsData}
      child={ <Link to="/addRoom"><Button>Add New Room</Button></Link> }
    />

  /*
    
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Rooms" subtitle="Manage" className="text-sm-left" />
    </Row>

    <Row>
      <Col>
        <div style={{marginBottom:"10px"}}>
          <Link to="/addRoom"><Button>Add New Room</Button></Link>
        </div>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Rooms</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            {
              (loading) && 
              <center><AtomSpinner color="blue"> </AtomSpinner></center>
            }
            {
                  (errMessage) && (!loading) &&
                  <center>
                  <div style={{padding:"30px"}}>
                    <p style={{color:"red"}}>{errMessage}</p>
                  </div>
                  </center>
            }
            {

              (!loading) && (!errMessage) &&

              <DataTable
                columns={columns}
                data={roomsData}
                className="table mb-0"
              />
          }
          </CardBody>
        </Card>
      </Col>
    </Row>

    
  </Container>*/
  );
}

export default Rooms;
