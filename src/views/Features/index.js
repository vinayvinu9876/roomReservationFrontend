import React, { useEffect} from "react";
import {Container,Row,Col,Card,CardHeader,CardBody, Button, FormInput, FormSelect } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatures, setSearch, setStatus } from '../../store/features/featuresSlice';
import { Link } from "react-router-dom";
import { AtomSpinner } from "react-epic-spinners";
import {Toaster} from 'react-hot-toast';
import EditFeatureModal from "./editFeature";
import Pagination from '../../components/Pagination/pagination';

const Features = () =>{

  const dispatch = useDispatch();

  const loading = useSelector(state=>state.features.loading);
  const errMessage = useSelector(state=>state.features.errMessage);
  const featureData = useSelector(state=>state.features.featuresData);

  const start = useSelector(state=>state.features.start);
  const end = useSelector(state=>state.features.end);
  const totalResults = useSelector(state=>state.features.totalResults);
  const pageNo = useSelector(state=>state.features.pageNo);
  const totalPages = useSelector(state=>state.features.totalPages);

  useEffect(()=>{ 
    dispatch(fetchFeatures());
  },[]);

  const getStatusColor = (status) => {

    switch (status) {
      case "active":
        return "green";
      case "maintenance":
        return "orange";
      case "permanently_unavailable":
        return "red";
      default:
        return "black";
    }

  }

  return (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Features" subtitle="Manage" className="text-sm-left" />
    </Row>
    
    <Toaster />
    <Row>
      <Col>
        <div style={{marginBottom:"10px"}}>
          <Link to="/addFeature"><Button>Add New Feature</Button></Link>
        </div>
        <SearchBar />
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Features</h6>
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
                  (!errMessage) && (!loading) && (featureData.length===0) &&
                  <center>
                  <div style={{padding:"30px"}}>
                    <p style={{color:"red"}}>No Features Data available</p>
                  </div>
                  </center>
            }
            {

              (!loading) && (!errMessage) && (featureData.length>0) &&

              
            <table style={{overflowY:'scroll',overflowX:"scroll"}} className="table mb-0">
              
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    Feature Name
                  </th>
                  <th scope="col" className="border-0">
                    Description
                  </th>
                  <th scope="col" className="border-0">
                    Total Available
                  </th>
                  <th scope="col" className="border-0">
                    Updated at
                  </th>
                  <th scope="col" className="border-0">
                    Status
                  </th>
                  <th scope="col" className="border-0">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                
                {
                  featureData.map((val,index)=>{
                    return (
                      <tr>
                        <td>{start+index}</td>
                        <td>{val["feature_name"]}</td>
                        <td>{val["feature_desc"]}</td>
                        <td>{val["total_available"]}</td>
                        <td>{val["updated_at"]}</td>
                        <td style={{textTransform:"capitalize",color:getStatusColor(val["status"])}}>
                          {val["status"].split("_").join(" ")}
                        </td>
                        <td><EditFeatureModal featureData={val}/></td>
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
          activePageNo={parseInt(pageNo)}
          totalResults={totalResults}
          totalPages={parseInt(totalPages)}
          onPageClick={(pageno)=>{
            dispatch(fetchFeatures(pageno));
          }}
        />
      </Col>
    </Row>

    
  </Container>
  );
}

const SearchBar = () =>{

  const dispatch = useDispatch();
  const status = useSelector(state=>state.features.status);
  const search = useSelector(state=>state.features.search);

  return (
    <Row style={{paddingBottom:"20px",marginTop:"15px"}}>
      <Col lg={4} md={4} sm={12} xs={12}>
        <label>Search</label>
        <FormInput type="text" 
                    value={search}
                    placeholder="Search.."
                    onChange={
                      (evt)=>{
                        dispatch(setSearch(evt.target.value))
                      }
                    } 
        />
      </Col>
      <Col lg={4} md={4} sm={12} xs={12}>
        <label>Status</label>
        <FormSelect value={status} onChange={(evt)=>{ dispatch(setStatus(evt.target.value))}}>
            <option value={null}>Choose ...</option>
            <option value="active">Active</option>
            <option value="maintenance">Under Maintenance</option>
            <option value="permanently_unavailable">Permanently Unavailable</option>
        </FormSelect> 
      </Col>
      <Col lg={2} md={2} xs={12} sm={12} style={{marginTop:"30px"}}>
        <Button theme="primary" onClick={()=>{ dispatch(fetchFeatures(1)) }  }>
          <i class="material-icons">search</i>
        </Button>
      </Col>
    </Row>
  );

}



export default Features;
