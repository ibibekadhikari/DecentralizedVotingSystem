import axios from "axios";
import React, {useState} from "react";

const Election = () => {

    const [electionData, setElectionData] = useState([]);

    const getData = async () => {
        fetch('http://192.168.1.82:3030/api/elections')
        .then((response) => response.json())
        .then((data) => setElectionData(data));
    }
    
  return (
   <>
    <h1>Hello from ELECTION</h1>
        <ul>
         {
            electionData.map((data)=>{
                return <li>{data.e_name}</li>
            })
         }
        </ul>
        
    <button className="btn brn-primary" onClick={getData}>Click me</button>
    </>
  )
}

export default Election