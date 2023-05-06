const express = require("express");
const router = express.Router()


router.all("/:api_name",(req,res)=>{
    res.send(req.params.api_name+ "\n")
})

module.exports=router