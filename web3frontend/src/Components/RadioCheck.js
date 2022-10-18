import React, {useState} from 'react'

const RadioCheck = () => {
  
  const [value, setValue ] = useState('')
   
   const submitVal = (e) => {
      e.preventDefault();
   }
    const handleChange = (e) => {
        const valueHere = e.target.value;
          setValue(valueHere);  
    }
  
    return (
    <div className="container vh-18">
        <form onSubmit={(e) => {submitVal(e)}}>
  
        <div>
            <h1>{value}</h1>
        <label htmlFor='male'>Male.</label>
        <input type="radio" name="gender" value="male" onChange={(e) => {handleChange(e)}}></input>
        </div>
        <div>
        <label htmlFor='female'>FeMale.</label>
        <input type="radio" name="gender" value="female" onChange={(e) => {handleChange(e)}}></input>
        <button className="btn btn-primary" type="button" value="Submit">Click</button>
        </div>
        </form>
    </div>
  )
}

export default RadioCheck