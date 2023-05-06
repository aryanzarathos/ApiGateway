import express from "express";
const router = express.Router()

router.all("/fakeapi",(req,res)=>{
    res.send("HELLO GUYS")
})
export default router