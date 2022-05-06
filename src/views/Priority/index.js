import React, { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Button } from "shards-react";
import { Link } from "react-router-dom";
import CustomTablePage from "../../components/table";
import fetchPriority from "../../store/priority/fetchPriority";

const Priority = () =>{

    const dispatch = useDispatch();

  const priorityData = useSelector(state=>state.priority.priorityData);
  const loading = useSelector(state=>state.priority.loading);
  const errMessage = useSelector(state=>state.priority.errMessage);

  useEffect(()=>{
    dispatch(fetchPriority());
  },[]);

  const columns = [
    {
      name : "#",
      selector : row => row.id,
      sortable : false
    },
    {
        name: 'Priority No.',
        selector: row => row.priority_no,
        sortable: true,
        sortField: 'priority_no',
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
        sortField: 'name',
    },
    {
        name: 'Description',
        selector: row => row.desc,
        sortable: true,
        sortField: 'desc',
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
        sortField: 'status',
    },
    {
      name : "Updated on",
      selector : row => row.updated_on,
      sortable : true,
      sortField : "updated_on"
    }
];

    return (
        <CustomTablePage 
        pageName={"Priority"} 
        columns={columns} 
        loading={loading} 
        errMessage={errMessage} 
        data={priorityData}
        child={ <Link to="/addPriority"><Button>Add New Priority</Button></Link> }
        />
    )

}

export default Priority;