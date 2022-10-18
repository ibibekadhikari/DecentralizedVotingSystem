const mongoose = require("mongoose");


//Creating schema of mongoose...

//Counting the id of candidate. - BIBEK
const getCandidate = async () => {
    try{
     const result = await Candidate.find({}).count();
     return result;
    
    }catch(err){
        return "Couldn't get the parties data right now.";
    }
    }

const candidateSchemas = new mongoose.Schema({
    c_id: Number,
    c_name: String,
    c_gender: String,
    c_party: String,
    c_post: String,
    c_votes: Number,
    reg_date: {
        type:Date,
        default: Date.now()

    }
})

candidateSchemas.pre('save', async function(){
    if(!this.c_id || this.c_id === null){
        const response = await getCandidate();
        console.log(response);
        this.c_id = response + 1;
    }
})



//The below command will create a model from Schemas.

const Candidate = new mongoose.model("Candidate", candidateSchemas);

module.exports = Candidate;