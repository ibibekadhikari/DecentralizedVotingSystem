import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Register= () => {

   const url = "http://localhost:3030/api/admins";

  const [fetchedData, setFetchedData] = useState([]);

  useEffect(()=>{
    fetch(url).then((resp)=>resp.json()
    .then((data)=>setFetchedData(data)))
  },[])
    
    const navigate = useNavigate();
    const loginHere = () =>{
        navigate("/login");
    }

    const userDetails = {
        email: useRef(""),
        citizenship: useRef(""),
        password: useRef(""),
        cpassword: useRef("")
      }
    const {email, citizenship, password, cpassword} = userDetails;

    const checkEmailExist = () => {
        var exist = true;        
        for (let element of fetchedData){
            if (element.a_email === userDetails.email.current.value){
              exist = false;
              break;
            }else {
              exist = true;
            }

    }
    return exist;
  }


   const submitRegister = () => {
    const newData = {
      a_email: email.current.value,
      a_citizenship: citizenship.current.value,
      a_password: password.current.value,
      a_cpassword: cpassword.current.value
    }
    
    if (checkEmailExist()){
    axios.post(url,newData).then((resp)=>{
      console.log("The data has been Posted successfully.")
      toast.success('Admin has been registered Successfully.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }).catch((err)=>{
      console.log("The post has not been completed.")
    })    
   }else{
    toast.error('Your Email address has been already Registered.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
   }

    }
  return (
<>
<ToastContainer />
  <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0" style={{fontSize: "20px"}}>Admin Register Here.</p>

          </div>
          <hr style={{margin: "50px 0px"}}></hr>
        
          <div className="form-outline mb-4">
            <input type="email" id="form3Example3" className="form-control form-control-lg" ref={email}
              placeholder="Enter a valid email address" />
            <label className="form-label fw-bold" style={{margin: "15px 0px 0px"}} for="form3Example3">Email address</label>
          </div>
          <div className="form-outline mb-4">
<input type="text" id="form3Example4" className="form-control form-control-lg" ref={citizenship}
    placeholder="Enter Citizenship Number" />
  <label className="form-label fw-bold" style={{margin: "15px 0px 0px"}} for="form3Example4">Citizenship</label>
</div>
<div className="form-outline mb-3">
  <input type="password" id="form3Example4" ref={password}className="form-control form-control-lg"
    placeholder="Password" />
  <label className="form-label fw-bold" style={{margin: "15px 0px 0px"}} for="form3Example4">Password</label>
</div>
<div className="form-outline mb-3">
  <input type="password" id="form3Example4" ref={cpassword} className="form-control form-control-lg"
    placeholder="Confirm password" />
  <label className="form-label fw-bold" style={{margin: "15px 0px 0px"}} for="form3Example4">Confirm password</label>
</div>

<div className="text-center text-lg-start mt-4 pt-2">
  <button type="button" className="btn btn-primary btn-lg text-center"
    style={{paddingLeft: "2.5rem", paddingRight: "2.5rem", marginTop: "-10px"}} onClick={submitRegister}>Register</button>
  <p className="small fw-bold mt-2 pt-1 mb-0" >Already have an account? <a href="#!"
      className="link-danger" onClick={loginHere}>Login</a></p>
</div>
          

        </form>
      </div>
    </div>
  </div>

</section>

</>
  )
}

export default Register
