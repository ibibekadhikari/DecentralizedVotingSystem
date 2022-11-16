import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Jonsnow from "../../images/jonsnow.jpg";
import Rhaenyra from "../../images/Rhaenyra.jpeg"
import Jessepinkman from "../../images/jessepinkman.jpeg";
import Janemargolis from "../../images/janemargolis.jpeg";




const VoterByType = (props) => {

  const maleImg = [Jessepinkman, Jonsnow];
  const femaleImg = [Rhaenyra, Janemargolis];



  const [candidateData, setCandidateData] = useState([]);  
  useEffect(()=> {
    fetch('http://localhost:3030/api/candidates')
    .then((response) => response.json())
    .then((data) => setCandidateData(data));
},[])
 
const [PartyInfo, setPartyInfo] = useState([]);
useEffect(()=> {
  fetch('http://localhost:3030/api/parties')
  .then((response) => response.json())
  .then((data) => setPartyInfo(data));
},[])
  
const giveMePName = (p_id) => {
  var new_pid = null;
  for (const element of PartyInfo){
      if(parseInt(p_id) === parseInt(element.p_id)){
          new_pid = element.p_name;
      }
  }
  return new_pid;
}

const [votedData, setVotedData] = useState(0);

const voteDone = (e) => {
  e.preventDefault();
  const newData = e.target.value;
  setVotedData(e.target.value);

}

  const listName = props.c_post;
  
  const voteClicked =() => {
    const c_id = parseInt(votedData);

    for (const element of candidateData){
         if(element.c_id === c_id){
            element["c_votes"] = element.c_votes + 1;
            const newData = {...element}
            axios.put('http://localhost:3030/api/candidates', newData).then((resp)=> console.log(resp)).catch((err)=>{console.log(err)})
         }
    }    

  }


  return (
    <>
    <h2 className="text-center" style={{borderRadius: "10px", backgroundColor: "#80b8ed", height: "50px"}}>{props.c_post}.</h2>
    <div style={{display: "flex", flexDirection: "row",  justifyContent: "space-around"}}>
    {
    candidateData.map((data)=>{
      const getImage = () => { 
      if (data.c_name === "Jon Snow"){
        return Jonsnow;
      }else if (data.c_name === "Rhaenyra"){
        return Rhaenyra;
      }else if (data.c_name === "Jane Margolis"){
        return Janemargolis;
      }else if (data.c_name === "Jesse Pinkman"){
        return Jessepinkman;
      }else{
        if(data.c_gender === "male"){
          return Jonsnow;
        }else{
          return Rhaenyra;
        }
      }  }
        if(data.c_post === props.c_post){    
          return(
            <div key={data.c_id} >                         
            <div className="card"  style={{width:"200px", margin:"10px"}}>
            <img className="card-img-top" style={{width: "200px", height:"150px"}} src={getImage()} alt="Card image" />
            <div className="card-body">
            <h3 className="card-title" style={{fontSize: "20px"}}>{data.c_name}</h3>
            <h4 className="card-title"  style={{fontSize: "15px"}}>Party: {giveMePName(data.p_id)}</h4>
            <h4 className="card-title"  style={{fontSize: "15px"}} >Post: {data.c_post}</h4>
            <label htmlFor="VoteFor">Click to Vote:    </label>
            <input type="radio" style={{margin: "0px 15px"}} name={props.c_post} onChange={(e)=>{voteDone(e)}} id={data.c_post} value={data.c_id}></input>
            </div>
            </div>    
           </div>
        )}
    
     })   
    }    
    </div>
    </>
  )
}

export default VoterByType