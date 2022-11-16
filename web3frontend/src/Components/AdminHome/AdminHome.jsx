import React from 'react'
import { Routes, useNavigate } from 'react-router-dom'

const AdminHome = () => {

    const navigate = useNavigate();

    const regElection = () => {
        navigate("/registerelection")
    }
    const regParty = () => {
        navigate("/registerparty")
    }
    const regCandidate = () => {
        navigate("/registercandidate")
    }
    const regVoter = () => {
        navigate("/registervoter")
    }
    const voterView = () => {
        navigate("/voterlogin")
    }
    const electionResult = () => {
        navigate("/electionresult")
    }



  return (
    <>
    <div className="Home-container">
    <h1 className="text-center"> Welcome to Admin Panel System.</h1>
    <div className='container in-home' style={{borderRadius: "20px", marginTop: "100px"}}>
      <h2>Admin Management</h2>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}} >
            <div>
            <div>
            <h5>Register Election.</h5>
            <button className='btn btn-primary' style={{height: "70px", marginTop: "20px"}} onClick={regElection}>Register Election.</button>
            </div>
            <div>
            <h5>Register Party.</h5>
            <button className='btn btn-primary' style={{height: "70px", marginTop: "20px"}} onClick={regParty}>Register Party.</button>
            </div>
            </div>
            <div>
            <div>
            <h5>Register Candidate.</h5>
            <button className='btn btn-primary' style={{height: "70px", marginTop: "20px"}} onClick={regCandidate}>Register Candidate.</button>
            </div>
            <div>
            <h5>Register Voter.</h5>
            <button className='btn btn-primary' style={{height: "70px", marginTop: "20px"}} onClick={regVoter} >Register Voter.</button>
            </div>
            </div>
            <div>
            <h5>Election RUNNING!!! VOTE NOW</h5>
            <button className='btn btn-primary' style={{height: "70px", marginTop: "20px"}} onClick={voterView} >VOTE FROM HERE.</button>
            </div>
            <div>
            <h5>Election Result.</h5>
            <button className='btn btn-primary' style={{height: "70px", marginTop: "20px"}} onClick={electionResult} >See Result.</button>
            </div>
      </div>
      </div>
      </div>
     </>
  )
}

export default AdminHome