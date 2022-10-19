import axios from 'axios';
import React, {useState, useEffect} from 'react'
import "./PostElection.css";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

const PostElection = () => {
  const { state: { contract, accounts,artifact } } = useEth();

const url = "http://localhost:3030/api/elections";
  
const [electionData, setElectionData] = useState({
    e_name: '',
    is_running: false,
    p_count: null,
    e_id : 0,
})

const postData = async() => {

  await contract.methods.registerElection(electionData.e_name).send({ from: accounts[0] }).then(function(event){
    const a = event.events.EventCreateElection.returnValues;
    console.log(a);
    const rdata = {
    e_name: a.election_name,
    is_running: false,
    e_id: a.election_id,
    }
    setElectionData(rdata);

    axios.post(url,electionData).then((resp)=>{
      console.log("The data has been Posted successfully.")
      console.log(electionData)
    }).catch((err)=>{
      console.log("The post has not been completed.")
    })


  })
}

const [partyCount, setpartyCount] = useState([]);

useEffect(()=> {
  fetch('http://localhost:3030/api/candidates')
  .then((response) => response.json())
  .then((data) => setpartyCount(data));
})

const handleChange = (e) => {
    e.preventDefault();
    electionData[e.target.name] = e.target.value; 
    electionData["p_count"] = partyCount.length;

    const newData = {...electionData};
    setElectionData(newData);

}
const content = <>
<div>
    <section className="vh-100 bg-image"
    style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-7 col-xl-6 ">
            <div className="card" style={{borderRadius: "15px"}}>
              <div className="card-body p-5 ">
                <h2 className="text-center mb-5">Register Election Data.</h2>  
                
                <form>  
                  <div className="form-outline mb-2" >
                  <label className="form-label " forhtml="e_name">Election Name</label>
                  <input type="text" name="e_name" value={electionData.e_name} onChange={(e)=> handleChange(e)} className="text-center form-control form-control-sm" />
                  </div>                    
                  <label className="form-label">Is the election Running?</label>
                  <br></br>
                  <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" onChange={(e)=>{handleChange(e)}} name="is_running" value={true} />
                 <label className="form-check-label" forhtml="is_running">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" onChange={(e)=>{handleChange(e)}} name="is_running" value={false}/>
                <label className="form-check-label" forhtml="is_running">No</label>
                    </div>
  
                  <div className="d-flex justify-content-center">
                    <button type="button"
                      className="btn btn-primary btn-sm w-50 text-center gradient-custom-4 text-body" onClick={postData} style={{marginTop: "20px"}}>Register Election.</button>
                  </div>
  
                  <p className="text-center text-muted mt-5">Please Provide The Data Safely.</p>

  
                </form>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>

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

export default PostElection;