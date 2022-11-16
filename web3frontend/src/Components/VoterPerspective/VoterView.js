import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation, useLoaderData } from 'react-router-dom';
import VoterByType from './VoterByType';
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

const VoterView = () => {
  const { state: { contract, accounts,artifact } } = useEth();
  const navigate = useNavigate();
  const location = useLocation();

  const url = "https://pbs.twimg.com/media/EALH6rFXUAIdDmt?format=jpg&name=medium";

  const [VotedValue, setVotedValue] = useState({});


  // const stateSET = () => {
  //     setPresident()
  //     setVicepresident()
  //     setTreasurert()
  //     setMember()
  // }

  // const adminHome = () => {
  //   stateSET()
  // }



    // useEffect(()=> {
    //   setVotedValue(votedValueRec);     
    // })

    const radioCheck = () => {
      const allInput = document.getElementsByTagName("input");
      const VotedValueAr = []
      for(const radBtn of allInput){
         if(radBtn.type === "radio"){
          if(radBtn.checked){
          VotedValueAr.push([radBtn.id, radBtn.value, ])
          }
         }
      }
      return VotedValueAr;
    }



const [candidateData, setCandidateData] = useState([]);
const [rToken, setrToken] = useState(location.state.value)
  
  useEffect(()=> {
    fetch('http://localhost:3030/api/candidates')
    .then((response) => response.json())
    .then((data) =>{
       setCandidateData(data)
      });
      setrToken(location.state.value);
})

const [partiesData, setPartiesData] = useState([]);

// useEffect(()=> {
//   fetch('http://localhost:3030/api/parties')
//   .then((response) => response.json())
//   .then((data) => setPartiesData(data));
// },[])

  const checkPID = (c_id) =>{
    var pID = 0;
    candidateData.forEach((element)=>{
      if (parseInt(element.c_id)===parseInt(c_id)){
        pID = element.p_id;
      }
    })
    return pID
  }



// const votenow = () => {
//   const votedList =  radioCheck()
//   const myObj = {}     
//   votedList.forEach((element) => {
//    console.log(element[1])
//    myObj[element[0]] = parseInt(element[1]);
//  });
//  console.log(myObj)
//  setVotedValue(myObj)
//  console.log(VotedValue)
// };

const votenow = async() => {
  const votedList =  radioCheck()
  // const myObj = {}     
  votedList.forEach((element) => {
   VotedValue[element[0]] = [parseInt(element[1]),checkPID(parseInt(element[1]))];
 });

 const pValue = VotedValue.President[0]
 const vValue = VotedValue["Vice-President"][0]
 const tValue = VotedValue.Treasurer[0]
 const sValue = VotedValue.Secretary[0]
 const mValue = VotedValue.Member[0]

 const myValues = [pValue, vValue, tValue, sValue, mValue];
 

//  console.log('Lec_Election_2022',[VotedValue["President"][1],VotedValue["Vice-President"][1],VotedValue["Secretary"][1],VotedValue["Treasurer"][1],VotedValue["Member"][1]],[VotedValue["President"][0],VotedValue["Vice-President"][0],VotedValue["Secretary"][0],VotedValue["Treasurer"][0],VotedValue["Member"][0]],rToken);

 await contract.methods.vote('Lec_Election_2022',[VotedValue["President"][1],VotedValue["Vice-President"][1],VotedValue["Secretary"][1],VotedValue["Treasurer"][1],VotedValue["Member"][1]],[VotedValue["President"][0],VotedValue["Vice-President"][0],VotedValue["Secretary"][0],VotedValue["Treasurer"][0],VotedValue["Member"][0]],rToken).send({ from: accounts[0] }).then(function(event){
try{
  const a = event.events.EventVoted.returnValues;
  if (a.vote_status==true){
    console.log("Successfully voted");
    axios.put("http://localhost:3030/api/candidates",myValues).then((data)=>{
      console.log("Updated PRESIDENT")
    }).catch((err)=>{
      console.log("PResident couldn't updated");
    })
    navigate("../../voterlogin")
  }
}
catch(e){
  console.log(e);
}
 
})
//  setVotedValue(myObj)

};

const content = <>
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
            <VoterByType c_post="Secretary" />
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
    <button className='btn btn-success' onClick={votenow}>VOTE NOW.</button>
</>
   
  return (
    <>
     {
      !artifact ? <NoticeNoArtifact /> :
        !contract ? <NoticeWrongNetwork /> :
        content
      }
    </>
  )
}

export default VoterView