const express = require("express");
const mongoose = require("mongoose");

const Election = require("./models/Election");
const Party = require("./models/Party");
const Candidate = require("./models/Candidate");
const Voter = require("./models/Voter");
const Admin = require("./models/Admin");

const router = express.Router();


// router.post("/admins", async (req,res)=>{

//     //The req.body is coming from PostMan.
//     const admin = await new Admin(req.body);
//     admin.save().then(()=>{
//             res.send(admin);
//     }).catch((err)=>{console.log(err)}
    
//     )
// })

// router.post("/elections", async (req,res)=>{

//     //The req.body is coming from PostMan.
//     const election = await new Election(req.body);


//     election.save().then(()=>{
//             res.send(election)
//     }).catch((err)=>{console.log(err)}
    
//     )
// })

// router.post("/parties",async (req,res)=>{
 
//     //The req.body is coming from PostMan.
//     const party = await new Party(req.body);


//     party.save().then(()=>{
//             res.send(party)
//     }).catch((err)=>{console.log(err)})
// })

// router.post("/candidates",async (req,res)=>{

//     //The req.body is coming from PostMan.
//     const candidate = await new Candidate(req.body);


//     candidate.save().then(()=>{
//             res.send(candidate)
//     }).catch((err)=>{console.log(err)})
// })

// router.post("/voters",async (req,res)=>{

//     //The req.body is coming from PostMan.
//     const voter = await new Voter(req.body);


//     voter.save().then(()=>{
//             res.send(voter)
//     }).catch((err)=>{console.log(err)})
// })




router.post("/api/:id", async (req,res)=>{
    
    let url_id = req.params.id;
    console.log(url_id)
    if(url_id === "elections"){     

        const election = await new Election(req.body);

        election.save().then(()=>{
                res.send(election)
        }).catch((err)=>{console.log(err)}
        
        )

    }

    else if(url_id === "parties"){
    
    const party = await new Party(req.body);
    party.save().then(()=>{
            res.send(party)
    }).catch((err)=>{console.log(err)})
    
    }
    else if(url_id === "candidates"){

    const candidate = await new Candidate(req.body);
    candidate.save().then(()=>{
        res.send(candidate)
       }).catch((err)=>{console.log(err)})
    }

    else if(url_id === "voters"){
    const voter = await new Voter(req.body);
    voter.save().then(()=>{
            res.send(voter)
    }).catch((err)=>{console.log(err)})
    }
    else if(url_id === "admins"){
        const admin = await new Admin(req.body);
        admin.save().then(()=>{
                res.send(admin)
        }).catch((err)=>{console.log(err)})
        }
    else{
        res.send("The Page you are looking for doesn't exist.");
    }

})

module.exports = router;