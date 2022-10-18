const mongoose = require("mongoose");


//Creating schema of mongoose...
const getElection = async () => {
    try{
     const result = await Election.find({}).count();
     return result;
    
    }catch(err){
        return "Couldn't get the Elections data right now.";
    }
    }


const electionSchemas = new mongoose.Schema({
    e_id: Number,
    e_name: String,
    is_running: Boolean,
    t_votes: Number,
    p_count: Number,
    e_count: Number,
    reg_date: {
        type:Date,
        default: Date.now()

    }
})

// electionSchemas.pre('save', async function(){
//     if(!this.e_id || this.e_id === null){
//         const response = await getElection();
//         console.log(response);
//         this.e_id = response + 1;
//     }
// })
//The below command will create a model from Schemas.

const Election = new mongoose.model("Election", electionSchemas);

module.exports = Election;
