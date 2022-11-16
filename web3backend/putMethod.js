const express = require("express");
const mongoose = require("mongoose");

const Election = require("./models/Election");
const Party = require("./models/Party");
const Candidate = require("./models/Candidate");
const Voter = require("./models/Voter");
const Admin = require("./models/Admin");

const router = express.Router();



router.put("/api/:id", async (req,res)=>{
    
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
    let x= req.body;
  
    let candidateVote = await Candidate.findOne({c_id : x[0]});
    await Candidate.updateOne({c_id : x[0]},{c_votes : candidateVote.c_votes + 1});
    console.log(new Date())
     candidateVote = await Candidate.findOne({c_id : x[1]});
    await Candidate.updateOne({c_id : x[1]},{c_votes : candidateVote.c_votes + 1});
  console.log(new Date())
     candidateVote = await Candidate.findOne({c_id : x[2]});
    await Candidate.updateOne({c_id : x[2]},{c_votes : candidateVote.c_votes + 1});
  console.log(new Date())
     candidateVote = await Candidate.findOne({c_id : x[3]});
    await Candidate.updateOne({c_id : x[3]},{c_votes : candidateVote.c_votes + 1});
  console.log(new Date())
     candidateVote = await Candidate.findOne({c_id : x[4]});
    await Candidate.updateOne({c_id : x[4]},{c_votes : candidateVote.c_votes + 1});
  console.log(new Date())

   
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