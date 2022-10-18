const mongoose = require("mongoose");


//Creating schema of mongoose...

const getVoter = async () => {
    try{
     const result = await Voter.find({}).count();
     return result;
    
    }catch(err){
        return "Couldn't get the Voters data right now.";
    }
    }


const voterSchemas = new mongoose.Schema({
    v_id: Number,
    v_name: String,
    v_gender: String,
    citizenship: String,
    wallet_add: String,
    has_Voted: Boolean,
    reg_date: {
        type:Date,
        default: Date.now()

    }
})

voterSchemas.pre('save', async function(){
    if(!this.v_id || this.v_id === null){
        const response = await getVoter();
        console.log(response);
        this.v_id = response + 1;
    }
})

//The below command will create a model from Schemas.

const Voter = new mongoose.model("Voter", voterSchemas);

module.exports = Voter;
