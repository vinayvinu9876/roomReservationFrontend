import React from "react";
import { Button } from "shards-react";
import {Card,CardBody} from 'shards-react';
 
const buttonMargin = {
    marginLeft : "5px",
    marginRight : "5px",
}

const Pagination = ({start,end,totalResults,totalPages,activePageNo,onPageClick}) => {  

    if(!totalPages){
        return <></>;
    }
        
    const pages = [];
    for(let i=1;i<=totalPages;i++){
        pages.push(i);
    }

    return (
    <>
        <Card style={{marginBottom:"15px"}}>
            <CardBody>
                {
                    activePageNo > 1 &&
                    <Button onClick={()=>{onPageClick(activePageNo-1)}} style={buttonMargin} outline theme="primary">Prev</Button>
                }
                {   
                    pages.map((val)=>{
                        if(val===activePageNo){
                            return  <Button style={buttonMargin} theme="primary">{val}</Button>
                        }
                        else{
                            return <Button onClick={()=>{onPageClick(val)}} style={buttonMargin} outline theme="primary">{val}</Button>
                        }
                    })
                }
                {
                    totalPages>1 && (activePageNo!==totalPages) &&
                    <Button style={buttonMargin} onClick={()=>{onPageClick(activePageNo+1)}} outline theme="primary">Next</Button>
                }
                </CardBody>
        </Card>
        <p style={{marginTop:"10px",marginLeft:"10px"}}>{start}-{end} of {totalResults} Results</p>
    </>
        
    )
}

export default Pagination;