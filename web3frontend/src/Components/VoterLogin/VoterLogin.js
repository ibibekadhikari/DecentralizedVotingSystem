
import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const VoterLogin= () => {

    const navigate = useNavigate();
    const [VoterData, setVoterData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      if (loading === false){
      getVoterData();        
      }
      },[])

      const userDetails = {
        citizenship: useRef(""),
        token: useRef("")
      }

        const {citizenship, token} = userDetails;
      const getVoterData = () => {
        fetch("http://localhost:3030/api/voters")
        .then((resp)=> resp.json())
        .then((data)=>{
          setVoterData(data)
          setLoading(true)
        }).catch((err)=>{
          console.log("ERROR IN LOGIN WHILE FETCHING DATA.")
          setLoading(true)
        })
      }

      const loginHere = () => {
        for (const data of VoterData){
            if (parseInt(data.citizenship) === parseInt(citizenship.current.value)){
                console.log("Matched"); 
                navigate("/voterview", {state:{value: token.current.value}})
            }
        }
        toast.error('Sorry!!! Citizenship didn\'t match', {
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

  return (
    <>
      <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          {/* <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"/>
          </div> */}
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
    
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0" style={{fontSize: "20px"}}>Voter Login Here.</p>
    
              </div>
              <hr style={{margin: "50px 0px"}}></hr>
            
              <div className="form-outline mb-4">
                <input type="text" id="citizenship" className="form-control form-control-lg" ref={citizenship}
                  placeholder="Enter a voter Citizenship." />
                <label className="form-label fw-bold" style={{margin: "15px 0px 0px"}} for="form3Example3">Citizenship Number.</label>
              </div>
              <div className="form-outline mb-4">
    <input type="text" id="token" className="form-control form-control-lg" ref={token}
        placeholder="Enter Token Number" />
      <label className="form-label fw-bold" style={{margin: "15px 0px 0px"}} for="form3Example4">Token Number</label>
    </div>
    
    <div className="text-center text-lg-start mt-4 pt-2">
      <button type="button" className="btn btn-primary btn-lg text-center"
        style={{paddingLeft: "2.5rem", paddingRight: "2.5rem", marginTop: "-10px"}} onClick={loginHere}>Login</button>

    </div>
              

            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
    
    </>
      )

  }

  export default VoterLogin