import React from 'react'
import './PageNotFound.scss'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  
    const navigate = useNavigate(); 

  return (
<>
<div className="face">
	<div className="band">
		<div className="red"></div>
		<div className="white"></div>
		<div className="blue"></div>
	</div>
	<div className="eyes"></div>
	<div className="dimples"></div>
	<div className="mouth"></div>
</div>
<h1 style={{textShadow: "2px 2px 4px orangered", fontSize:"150px", margin: "-50px"} }>404</h1>
<h1>Oops! Something went wrong!</h1>
<button className="btn" style={{margin:'10px'}} onClick={()=> {navigate("/")}}>Return to Home </button>

</>



    )
}

export default PageNotFound