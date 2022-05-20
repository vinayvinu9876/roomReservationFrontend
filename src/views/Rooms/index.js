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
      selector : row => row.room_data.room_id,
      sortable : false
    },
    {
        name: 'Room Name',
        selector: row => row.room_data.room_name,
        sortable: true,
        sortField: 'room_name',
    },
    {
        name: 'Capacity',
        selector: row => row.room_data.room_capacity,
        sortable: true,
        sortField: 'capacity',
    },
    {
        name: 'Status',
        selector: row => row.room_data.status,
        sortable: true,
        sortField: 'status',
    },
    {
      name : "Updated on",
      selector : row => row.room_data.updated_at,
      sortable : true,
      sortField : "updated_at"
    },
    {
      name :"View",
      cell : (row,index,column,id)=>{return <Link to={`/viewRoom?room_id=${row.room_data.room_id}`}><Button theme="primary">View</Button></Link>}
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
  );
}

export default Rooms;
