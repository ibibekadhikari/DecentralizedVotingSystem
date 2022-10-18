import React, {useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
    
    const navigate = useNavigate();
    const registerHere = () =>{
        navigate("/register");
    }


    const [adminData, setAdminData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      if (loading === false){
      getAdminData();        
      }
      },[])


      const getAdminData = () => {
        fetch("http://localhost:3030/api/admins")
        .then((resp)=> resp.json())
        .then((data)=>{
          setAdminData(data)
          setLoading(true)
        }).catch((err)=>{
          console.log("ERROR IN LOGIN WHILE FETCHING DATA.")
          setLoading(true)
        })
      }

    const userDetails = {
        email: useRef(""),
        password: useRef("")
      }
    const {email, password} = userDetails;

    const submitForm = (e) => {
        e.preventDefault();
        for(const element of adminData){
          const {a_email, a_password} = element;
          console.log(userDetails.email.current.value)
          console.log(a_email);

          if (a_email === userDetails.email.current.value && a_password === userDetails.password.current.value){
            navigate("/adminhome")
          }
        }
        toastHere();

      }
   

      const toastHere = () => {
        toast.error('Sorry!!! Email or Password didn\'t match', {
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



  return (

    <section className="vh-100">
        <ToastContainer />
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        
      <form action="" >

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0" style={{fontSize: "20px"}}>Admin Login Here.</p>

          </div>
          <hr style={{margin: "50px 0px"}}></hr>
        
          <div className="form-outline mb-4">
            <input type="email" id="form3Example3" ref={email} className="form-control form-control-lg"
              placeholder="Enter a valid email address" />
            <label className="form-label fw-bold" style={{margin: "15px 0px 0px"}} for="form3Example3">Email address</label>
          </div>
          <div className="form-outline mb-3">
            <input type="password" id="form3Example4" ref={password} className="form-control form-control-lg"
              placeholder="Enter password" />
            <label className="form-label fw-bold" style={{margin: "15px 0px 0px"}} for="form3Example4">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
        
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body" onClick={toastHere}>Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2" style={{zIndex: "25"}}>
            <button type="button" value="submit" className="btn btn-primary btn-lg"
              style={{paddingLeft: "2.5rem", paddingRight: "2.5rem", marginTop: 
              "-10px"}} onClick={submitForm}>Login</button>
            
            <p className="small fw-bold mt-2 pt-1 mb-0" >Don't have an account? <a href="#!"
                className="link-danger" onClick={registerHere}>Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>

</section>
  )
}

export default Login
