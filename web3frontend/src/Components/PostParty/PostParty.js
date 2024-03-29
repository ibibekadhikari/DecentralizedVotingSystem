import axios from 'axios';
import React, {useEffect, useState} from 'react'
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

const PostParty = () => {

  const { state: { contract, accounts,artifact } } = useEth();

const url = "http://localhost:3030/api/parties";
  


const [candidateCount, setcandidateCount] = useState([]);
const [electionId, setElectionId] = useState(0);
// const [electionName, setElectionname] = useState('');

useEffect(()=> {
        fetch('http://localhost:3030/api/elections')
        .then((response) => response.json())
        .then((data) => setcandidateCount(data));
})

const [PartyData, setPartyData] = useState({
    p_name: '',
    c_count: null,
    p_id: null,
    e_id: null,
})

const postData = async() => {
  await contract.methods.registerParty(PartyData.e_name,PartyData.p_name).send({ from: accounts[0] }).then(function(event){
    const a = event.events.EventCreateparty.returnValues;
    console.log(a);
    const rdata = {
      p_name: a.party_name,
      c_count: null,
      p_id: a.party_id,
      e_id: electionId
    }
    const robj = Object.assign(PartyData,rdata);
    console.log(rdata);
    setPartyData(rdata);
    axios.post(url,PartyData).then((resp)=>{
      console.log("The data has been Posted successfully.")
    }).catch((err)=>{
      console.log("The post has not been completed.")
    })
    // console.log(candidateCount.length)

  })
}

const [electionName, setElectionName] = useState('');

const handleChange = (e) => {
    e.preventDefault();
    PartyData[e.target.name] = e.target.value;
    PartyData["c_count"] = candidateCount.length;
    PartyData["e_id"] = electionId;
    PartyData["e_name"] = electionName;
    const newData = {...PartyData};
    setPartyData(newData);

}

const [isActive, setisActive] = useState(false);
// const [electionId, setElectionId] = useState('');

// const findElectionName = () => {
//   var ename = '';
//   for (const i of candidateCount){
//     if(i.e_id === electionId ){
//       ename = i.e_name;
//       // break;
//     }
//   }
//   return ename;
// }

const updateElectionName = (e) => {
     const a = (e.target.value).split(" ");
     const e_id = a[0].split(",")[0];
     const e_name = a[0].split(",")[1];
     console.log(e_id)
        setElectionId(e_id);
        setisActive(true);
        setElectionName(e_name);
        
}

const content = <>
  <section className="vh-100 bg-image"
    style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100" >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-7 col-xl-6 ">
            <div className="card" style={{borderRadius: "15px"}}>
              <div className="card-body p-5 ">
                <h2 className="text-center mb-5">Register Party Data {"\n"} For Election: {electionName}.</h2>  
                
                <form>  
                  <div className="form-outline mb-2" >
                  <label className="form-label " forhtml="v_name">Party Name</label>
                  <input type="text" name="p_name" value={PartyData.p_name} onChange={(e)=> handleChange(e)} className="text-center form-control form-control-sm" />
                  </div>         
                  
                  <div className="d-flex justify-content-center">
                    <button type="button"
                      className="btn btn-primary btn-sm w-50 text-center gradient-custom-4 text-body" onClick={postData} style={{marginTop: "20px"}}>Register Party.</button>
                  </div>
  
                  <p className="text-center text-muted mt-5">Please Provide The Data Safely.</p>

  
                </form>
  
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container h-100" style={{marginTop: "260px"}}>
      <div className="col-12 col-md-8 col-lg-7 col-xl-6 ">
            <div className="card" style={{borderRadius: "15px"}}>
            <div className="card-body p-5 ">
       <h2>Choose Your Election:</h2>
       <hr></hr>
      {
        candidateCount.map((elements)=>{
          return (
            <>
            <button className='btn btn-warning' style={{marginTop: "-5px", backgroundColor: isActive && electionId === elements.e_id? "#f0a046": "", }} value={[elements.e_id,elements.e_name]} onClick={(e) => updateElectionName(e)}>{elements.e_name}</button>

            </>
          )
        })
      }
      </div>
      </div>
      </div>
      </div>
    </div>
  </section>
</>



  return (
    <div>
      {
      !artifact ? <NoticeNoArtifact /> :
        !contract ? <NoticeWrongNetwork /> :
        content
      }
  </div>
  )
}

export default PostParty;