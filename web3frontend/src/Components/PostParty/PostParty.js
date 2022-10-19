import axios from 'axios';
import React, {useEffect, useState} from 'react'

const PostParty = () => {

const url = "http://localhost:3030/api/parties";
  


const [candidateCount, setcandidateCount] = useState([]);

useEffect(()=> {
        fetch('http://localhost:3030/api/elections')
        .then((response) => response.json())
        .then((data) => setcandidateCount(data));
})

const [PartyData, setPartyData] = useState({
    p_name: '',
    c_count: null,
    e_name: ''
})

const postData = () => {
    axios.post(url,PartyData).then((resp)=>{
      console.log("The data has been Posted successfully.")
    }).catch((err)=>{
      console.log("The post has not been completed.")
    })
    console.log(candidateCount.length)
}

const handleChange = (e) => {
    e.preventDefault();
    PartyData[e.target.name] = e.target.value;
    PartyData["c_count"] = candidateCount.length;
    PartyData["e_name"] = electionName;
    const newData = {...PartyData};
    setPartyData(newData);

}

const [isActive, setisActive] = useState(false);

const [electionName, setElectionname] = useState('');

const updateElectionName = (e) => {
     const eName = e.target.value;
        setElectionname(eName)
        setisActive(true);
}




  return (
    <div>
    <section className="vh-100 bg-image"
    style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100" >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-7 col-xl-6 ">
            <div className="card" style={{borderRadius: "15px"}}>
              <div className="card-body p-5 ">
                <h2 className="text-center mb-5">Register Party Data {electionName}.</h2>  
                
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
            <button className='btn btn-warning' style={{marginTop: "-5px", backgroundColor: isActive && electionName === elements.e_name? "#f0a046": "", }} value={elements.e_name} onClick={(e) => updateElectionName(e)}>{elements.e_name}</button>

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
  </div>
  )
}

export default PostParty;