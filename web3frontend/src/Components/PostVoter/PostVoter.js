import axios from 'axios';
import React, {useState} from 'react'
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

const PostVoter = () => {

  const { state: { contract, accounts,artifact } } = useEth();

const url = "http://localhost:3030/api/voters";
  
const [VoterData, setVoterData] = useState({
    v_name: '',
    v_gender: '',
    citizenship: '',
    wallet_add: ''
})

const postData = () => {
    axios.post(url,VoterData).then((resp)=>{
      console.log("The data has been Posted successfully.")
    }).catch((err)=>{
      console.log("The post has not been completed.")
    })
}

const handleChange = (e) => {
    e.preventDefault();
    VoterData[e.target.name] = e.target.value; 

    const newData = {...VoterData};
    setVoterData(newData);

}

const content = <>
<section className="vh-100 bg-image"
    style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-7 col-xl-6 ">
            <div className="card" style={{borderRadius: "15px"}}>
              <div className="card-body p-5 ">
                <h2 className="text-center mb-5">Register Voter Data.</h2>  
                
                <form>  
                  <div className="form-outline mb-2" >
                  <label className="form-label " forhtml="v_name">Voter Name</label>
                  <input type="text" name="v_name" value={VoterData.v_name} onChange={(e)=> handleChange(e)} className="text-center form-control form-control-sm" />
                  </div>         
                  <div className='m-3'>          
                  <label className="form-label">Gender :</label>
                  <br></br>
                  <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" onChange={(e)=>{handleChange(e)}} name="v_gender" value="male" />
                 <label className="form-check-label" forhtml="v_gender">Male</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" onChange={(e)=>{handleChange(e)}} name="v_gender" value="female"/>
                <label className="form-check-label" forhtml="v_gender">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" onChange={(e)=>{handleChange(e)}} name="v_gender" value="other"/>
                <label className="form-check-label" forhtml="v_gender">Other</label>
                </div> 
                    </div>
                    <div className="form-outline mb-2" >
                  <label className="form-label mb-2 " forhtml="e_name">Citizenship</label>
                  <input type="text" name="citizenship" value={VoterData.citizenship} onChange={(e)=> handleChange(e)} className="text-center form-control form-control-sm" />
                  </div>  
                  <div className="form-outline mb-2" >
                  <label className="form-label " forhtml="e_name">Wallet Address</label>
                  <input type="text" name="wallet_add" value={VoterData.wallet_add} onChange={(e)=> handleChange(e)} className="text-center form-control form-control-sm" />
                  </div>  
  
                  <div className="d-flex justify-content-center">
                    <button type="button"
                      className="btn btn-primary btn-sm w-50 text-center gradient-custom-4 text-body" onClick={postData} style={{marginTop: "20px"}}>Register Voter.</button>
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

export default PostVoter;