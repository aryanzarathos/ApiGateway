import express from "express";
import router from "./routes/index.js";
const app=express();
const PORT = 3000
app.use(express.json())

app.use('/',router)
app.listen(PORT,()=>{
    console.log("fakeapi has started on port" + PORT)
})