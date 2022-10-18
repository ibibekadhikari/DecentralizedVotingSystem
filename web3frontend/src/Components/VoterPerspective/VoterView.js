import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import VoterByType from './VoterByType';

const VoterView = () => {
  const navigate = useNavigate();
  const url = "https://pbs.twimg.com/media/EALH6rFXUAIdDmt?format=jpg&name=medium";

  const adminHome = () => {
    navigate('/adminhome');
  }
   
  return (
    <>
    <div className='vh-10' style={{display: "flex" , flexDirection: "column"}}>
         <div>
            <VoterByType c_post="President" />
        </div>
    
        <div>
            <VoterByType c_post="Vice-President" />
       </div> 
       <div>
            <VoterByType c_post="Treasurer" />
       </div> 
       <div>
            <VoterByType c_post="Member" />
       </div> 
      
      {/* {
        candidateData.map((data) => {
         return (
          <div key={data.c_id} >                         
                  <div className="card"  style={{width:"300px", margin:"10px"}}>
                  <img className="card-img-top" style={{width: "300px", height:"300px"}} src={url} alt="Card image" />
                  <div className="card-body">
                  <h3 className="card-title">{data.c_name}</h3>
                  <h4 className="card-title">Party: {data.c_party}</h4>
                  <h4 className="card-title">Post: {data.c_post}</h4>
                  <p className="card-text">Objective: Legalize Alcohol.</p>
                  <label htmlFor="VoteFor">Click to Vote:    </label>
                  <input type="radio" style={{margin: "0px 15px"}} name="voteNow" onChange={(e)=>{voteDone(e)}} value={data.c_id}></input>
                  </div>
                  </div>                 
                 </div>
                )
        })
      } */}
    </div>
    <button className='btn btn-success' onClick={adminHome}>VOTED SUCCEESSFULLY.</button>
    </>
  )
}

export default VoterView