import express from "express";
import router from "./routes/index.js"

const app=express();
const PORT = 13561
app.use(express.json())

app.use('/',router)
app.listen(PORT,()=>{
    console.log("gateway has started on port" + PORT)
})