import React from 'react'
import { Routes, useNavigate } from 'react-router-dom'
import "./Home.css"
const Home = () => {
  const navigate = useNavigate();
  
  const adminLogin = () => {
    navigate("/login")
  }

  const adminRegister= () => {
    navigate("/register")
  }
  

    return (
    <>
    <div className="Home-container">
    <h1 className="text-center"> Welcome to Decentralized Voting System.</h1>
    <div className='container in-home' style={{borderRadius: "20px", marginTop: "100px"}}>
      <h2>Admin Panel</h2>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}} >
            <div>
            <h5>Login Admin:</h5>
            <button className='btn btn-primary' style={{height: "70px"}} onClick={adminLogin}>Login Admin</button>
            </div>
            <div>
            <h5>Register Admin:</h5>
            <button className='btn btn-primary' style={{height: "70px"}} onClick={adminRegister}>Register Admin</button>
            </div>
      </div>
      </div>
      </div>
     </>
  )

}

export default Home