import express from "express";
import axios from "axios";

const router = express.Router();

router.all("/:api_name",(req,res)=>{
    axios.get("http://localhost:0008/fakeapi").then((response)=>{
        res.send(response.data)
    }).catch(()=>{
        res.send(req.params.api_name+ "\n"+"NOT DONE")
    })
})

export default router