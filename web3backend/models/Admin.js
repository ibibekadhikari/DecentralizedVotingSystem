const mongoose = require("mongoose");


//Creating schema of mongoose...

//Counting the id of candidate. - BIBEK
const getAdmin = async () => {
    try{
     const result = await Admin.find({}).count();
     return result;
    
    }catch(err){
        return "Couldn't get the admin data right now.";
    }
    }

const adminSchemas = new mongoose.Schema({
    a_id: Number,
    a_email: String,
    a_citizenship: String,
    a_password: String,
    a_cpassword: String, 
    reg_date: {
        type:Date,
        default: Date.now()

    }
})

adminSchemas.pre('save', async function(){
    if(!this.a_id || this.a_id === null){
        const response = await getAdmin();
        this.a_id = response + 1;
    }
})



//The below command will create a model from Schemas.

const Admin = new mongoose.model("Admin", adminSchemas);

module.exports = Admin;