const express = require("express");
const app=express();
const routes = require("./routes")
const PORT = 0007
app.use(express.json())

app.use('/',routes)
app.listen(PORT,()=>{
    console.log("gateway has started on port" + PORT)
})