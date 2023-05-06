const express = require("express");
const app=express();
const routes = require("./routes");
const PORT = 0008
app.use(express.json())

app.use('/',routes)
app.listen(PORT,()=>{
    console.log("fakeapi has started on port" + PORT)
})