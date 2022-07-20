import React,{useEffect} from 'react';
import CustomTablePage from '../../components/table';
import { Button } from 'shards-react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import fetchUserRooms from '../../store/UserRooms/fetchUserRooms';

const UserRooms = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchUserRooms());
    },[]);

    const loading = useSelector(state=>state.userRooms.loading);
    const errMessage = useSelector(state=>state.userRooms.errMessage);
    const roomsData = useSelector(state=>state.userRooms.rooms);

    const columns = [
        {
            name : "#",
            selector : row => row.room_id,
            sortable : false,
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
        },
        {
          name :"Reserve",
          cell : (row,index,column,id)=>{return <Link to={`/userRoomView?room_id=${row.room_id}`}><Button theme="primary">Reserve   </Button></Link>}
        }
    ];

    return (
        <CustomTablePage 
            pageName={"Meeting Rooms"}
            columns={columns}
            loading={loading}
            errMessage={errMessage}
            data = {roomsData}
            child={<></>}
            subtitle={"Reserve"}
        />
    )
}

export default UserRooms;