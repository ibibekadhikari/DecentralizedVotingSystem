const mongoose = require("mongoose");


//Creating schema of mongoose...
const getParty = async () => {
    try{
     const result = await Party.find({}).count();
     return result;
    
    }catch(err){
        return "Couldn't get the parties data right now.";
    }
    }


   
//Schemas Creation, Done.

const partySchemas = new mongoose.Schema(
    {
               p_id: {
                type: Number
               },
               e_id: Number,
                p_name: {
                type: String,
                require: true,
            },
            p_votes: Number,
            c_count: {
                 type: Number       
                },

                reg_date: {
    type:Date,
    default: Date.now()

},
}
);
// partySchemas.pre('save', async function(){
//     if(!this.p_id || this.p_id === null){
//         const response = await getParty();
//         console.log(response);
//         this.p_id = response + 1;
//     }
// })
//The below command will create a model from Schemas.

const Party = new mongoose.model("Party", partySchemas);

module.exports = Party;

//Get part begins here

