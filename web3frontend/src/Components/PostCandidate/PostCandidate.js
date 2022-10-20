import axios from 'axios';
import React, {useEffect,useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

const PostCandidate = () => {

const { state: { contract, accounts,artifact } } = useEth();
const [partyAll, setpartyAll] = useState([]);
const [partyCount, setpartyCount] = useState([]);
const [elections, setElections] = useState([]);

const [partyName, setPartyName] = useState('');
const [partyId, setPartyId] = useState('');
const [electionName, setElectionName] = useState('');
const [electionId, setElectionId] = useState('');
const [partydata, setPartydata] = useState('');

useEffect(()=> {
  fetch('http://localhost:3030/api/parties')
  .then((response) => response.json())
  .then((data) => setpartyAll(data));

  fetch('http://localhost:3030/api/elections')
      .then((response) => response.json())
      .then((data) => setElections(data));
},[]);
  // useEffect(()=> {
  //       fetch('http://localhost:3030/api/elections')
  //     .then((response) => response.json())
  //     .then((data) => setElections(data));
  //     });

const url = "http://localhost:3030/api/candidates"

const [CandidateData, setCandidateData] = useState({
    c_name: '',
    c_gender: '',
    c_citizenship: '',
    c_party: '',
    c_post: '',
    c_votes: 0,
    p_id:null,
    p_name:null,
    c_id:null                             
        })

  // const getEname = (data,p_id) =>{
  //   partyCount.forEach((element)=>{
  //     if (element.p_id == p_id){
  //       const e_id = element.e_id;
  //       data.forEach((element)=>{
  //         if (element.e_id == e_id){
  //           console.log(element.e_name);
  //         }
  //       })
  //     }
  //   })
  // }
        
 const postData = async() =>{
  
      
      await contract.methods.registerCandidate(CandidateData.e_name,CandidateData.p_name,CandidateData.c_name,CandidateData.c_post).send({ from: accounts[0] }).then(function(event){

        const a = event.events.EventCreateCandidate.returnValues;
        CandidateData["c_id"] = a.candidate_number;
        console.log(CandidateData);
        axios.post(url,CandidateData).then((resp)=>{
          console.log("The data has been Posted successfully.")
        }).catch((err)=>{
          console.log("The post has not been completed.")
        })
        // console.log(candidateCount.length)
    
      })
      // const ename = getEname(elections,CandidateData.p_id)


      // axios.post(url, CandidateData).then(()=>{
      //   console.log("Data has been done")
      //   toastHere();
      // }).catch((err)=>{console.log(err)});
 }



 const toastHere = () => {
  toast.success('Candidate Registered Successfully.', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}




  const handleChange= (e) =>{
        e.preventDefault();
        CandidateData[e.target.name] = e.target.value;
        CandidateData["p_id"] = partyId;
        CandidateData["p_name"] = partyName;
        const newData = {...CandidateData};
        setCandidateData(newData);        
  }

  const updatepartyName = (e)=>{
    const a = (e.target.value).split(" ");
    const p_id = a[0].split(",")[0];
    const p_name = a[0].split(",")[1];
    console.log(p_id,":",p_name);
       setPartyId(p_id);
       setPartyName(p_name);
  } 

  const partyhtml = <>


</>

  const updateElectionName = (e)=>{
    const a = (e.target.value).split(" ");
    const e_id = a[0].split(",")[0];
    const e_name = a[0].split(",")[1];
    console.log(e_id,":",e_name);
       setElectionId(e_id);
       setElectionName(e_name);
       CandidateData["e_id"] = e_id;
       CandidateData["e_name"] = e_name;
       const filteredData = partyAll.filter(x => x.e_id == e_id);
       setpartyCount(filteredData);
       console.log(filteredData);
       setPartydata(partyhtml);
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
                  <h2 className="text-center mb-5">Register Candidate Data.</h2>  
                  
                  <form>  
                    <div className="form-outline mb-2" >
                    <label className="form-label " forhtml="c_name">Candidate Name</label>
                    <input type="text" name="c_name" value={CandidateData.c_name} onChange={(e)=> handleChange(e)} className="text-center form-control form-control-sm" />
                    </div>         
                    <div className='m-3'>          
                    <label className="form-label">Gender :</label>
                    <br></br>
                    <div className="form-check form-check-inline">
                   <input className="form-check-input" type="radio" onChange={(e)=>{handleChange(e)}} name="c_gender" value="male" />
                   <label className="form-check-label" forhtml="c_gender">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" onChange={(e)=>{handleChange(e)}} name="c_gender" value="female"/>
                  <label className="form-check-label" forhtml="c_gender">Female</label>
                      </div>
                      <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" onChange={(e)=>{handleChange(e)}} name="c_gender" value="other"/>
                  <label className="form-check-label" forhtml="c_gender">Other</label>
                  </div> 
                      </div>
                      <div className="form-outline mb-2" >
                    <label className="form-label mb-2 " forhtml="c_citizenship">Citizenship</label>
                    <input type="text" name="c_citizenship" value={CandidateData.c_citizenship} onChange={(e)=> handleChange(e)} className="text-center form-control form-control-sm" />
                    </div>  
                    <div className="form-outline mb-2" >
                    <label className="form-label " forhtml="c_party">Party </label>
                    <input type="text" name="c_party" value={partyName} onChange={(e)=> handleChange(e)} className="text-center form-control form-control-sm" />
                    </div>  
                    <div className="form-outline mb-2" >
                    <label className="form-label " forhtml="c_post">Post</label>
                    <input type="text" name="c_post" value={CandidateData.c_post} onChange={(e)=> handleChange(e)} className="text-center form-control form-control-sm" />
                    </div>  
    
                    <div className="d-flex justify-content-center">
                      <button type="button"
                        className="btn btn-primary btn-sm w-50 text-center gradient-custom-4 text-body" onClick={postData} style={{marginTop: "20px"}}>Register Candidate.</button>
                    </div>
    
                    <p className="text-center text-muted mt-5">Please Provide The Data Safely.</p>
  
                    <ToastContainer />
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
     <h2>Choose Your Party:</h2>
     <hr></hr>
    {
      partyCount.map((elements)=>{
        return (
          <>
          <button className='btn btn-warning' style={{marginTop: "-5px"}} value={[elements.p_id,elements.p_name]} onClick={(e) => updatepartyName(e)}>{elements.p_name}</button>

          </>
        )
      })
    }
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
        elections.map((elements)=>{
          return (
            <>
            <button className='btn btn-warning' style={{marginTop: "-5px"}} value={[elements.e_id,elements.e_name]} onClick={(e) => updateElectionName(e)}>{elements.e_name}</button>

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

export default PostCandidate