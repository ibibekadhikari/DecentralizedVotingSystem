const express = require("express");
const mongoose = require("mongoose");

const Election = require("./models/Election");
const Party = require("./models/Party");
const Candidate = require("./models/Candidate");
const Voter = require("./models/Voter");
const Admin = require("./models/Admin");

const router = express.Router();


router.get("/api/:id", async (req,res)=>{
    
    let url_id = req.params.id;

    if(url_id === "admins"){
        const response = await Admin.find({});
        res.send(response);
        }
    else if(url_id === "elections"){
    const response = await Election.find({});
    res.send(response);
    }
    else if(url_id === "parties"){
        const response = await Party.find({});
        res.send(response);
    }
    else if(url_id === "candidates"){
        const response = await Candidate.find({});
        res.send(response);
    }
    else if(url_id === "voters"){
        const response = await Voter.find({});
        res.send(response);
    }else{
        res.send("The Page you are looking for doesn't exist.");
    }
})

// router.get("/api/parties", async (req,res)=>{
//     const response = await Party.find({});
//     res.send(response);
// })

// router.get("/api/candidates", async (req,res)=>{
//     const response = await Candidate.find({});
//     res.send(response);
// })

// router.get("/api/voters", async (req,res)=>{
//     const response = await Voter.find({});
//     res.send(response);
// })


module.exports = router;