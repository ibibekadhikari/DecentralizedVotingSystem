import React, { useEffect, useState } from 'react';
import "./VoterView.css";



const VoteViewSystem = () => {

   const [candidateData, setCandidateData] = useState([]);

   useEffect(()=> {
    fetch('http://localhost:3030/api/candidates')
    .then((response) => response.json())
    .then((data) => setCandidateData(data));
})

   

  return (
    <>
    <div style={{display: "flex", flexDirection: "row", height: "650px"}}>      
            <div className='forPresident voteDiv'>

            <h1>President : VOTE</h1>
            <hr></hr> 
            {
                candidateData.map((element)=>{
                    if(element.c_post === "President"){
                        return <h3 className="text-tittle"  style={{marginTop: "50px"}}key={element._id}>{element.c_name} : <span style={{color: "green", margin:"30px 30px"}}> {element.c_votes} </span></h3>
                    }
                })
            }
             
            </div>
            <div className='forVicePresident voteDiv'>
            <h1>Vice-President: VOTE</h1>
            <hr></hr>
            {
                candidateData.map((element)=>{
                    if(element.c_post === "Vice-President"){
                        return <h3 className="text-tittle"  style={{marginTop: "50px"}}key={element._id}>{element.c_name} : <span style={{color: "green", margin:"30px 30px"}}> {element.c_votes} </span></h3>
                    }
                })
            }
             
            </div>
            <div className='forTreasurer voteDiv'>
            <h1>Treasurer: VOTE</h1>
            <hr></hr>
            {
                candidateData.map((element)=>{
                    if(element.c_post === "Treasurer"){
                        return <h3 className="text-tittle"  style={{marginTop: "50px"}}key={element._id}>{element.c_name} : <span style={{color: "green", margin:"30px 30px"}}> {element.c_votes} </span></h3>
                    }
                })
            }
             
            </div>
            <div className='forMember voteDiv'>
            <h1>Member: VOTE</h1>
            <hr></hr>
            {
                candidateData.map((element)=>{
                    if(element.c_post === "Member"){
                        return <h3 className="text-tittle"  style={{marginTop: "50px"}}key={element._id}>{element.c_name} : <span style={{color: "green", margin:"30px 30px"}}> {element.c_votes} </span></h3>
                    }
                })
            }
             
            </div>
    </div>
    </>
  )
}

export default VoteViewSystem