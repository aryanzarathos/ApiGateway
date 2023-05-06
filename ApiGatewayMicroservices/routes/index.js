import registry from "./registry.json" assert { type: "json" };
import express from "express";
import axios from "axios";
import loadbalancer from "../utils/loadbalancer.js";

const router = express.Router();


router.post('/enable/:apiName', (req, res) => {
    const apiName = req.params.apiName
    const requestBody = req.body
    const instances = registry.services[apiName].instances
    const index = instances.findIndex((srv) => { return srv.url === requestBody.url })
    if(index == -1){
        res.send({ status: 'error', message: "Could not find '" + requestBody.url + "' for service '" + apiName + "'"})
    } else {
        instances[index].enabled = requestBody.enabled
        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
            if (error) {
                res.send("Could not enable/disable '" + requestBody.url + "' for service '" + apiName + ":'\n" + error)
            } else {
                res.send("Successfully enabled/disabled '" + requestBody.url + "' for service '" + apiName + "'\n")
            }
        })
    }
})

router.all("/:api_name/:path",(req,res)=>{
    const service = registry.services[req.params.apiName]
    if (service) {
        if (!service.loadBalanceStrategy) {
            service.loadBalanceStrategy = 'ROUND_ROBIN'
            fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
                if (error) {
                    res.send("Couldn't write load balance strategy" + error)
                }
            })
        }

        const newIndex = loadbalancer[service.loadBalanceStrategy](service)
        const url = service.instances[newIndex].url
        console.log(url)
        axios({
            method: req.method,
            url: url + req.params.path,
            headers: req.headers,
            data: req.body
        }).then((response) => {
            res.send(response.data)
        }).catch(error => {
            res.send("")
        })
    } else {
        res.send("API Name doesn't exist")
    }
   
})
router.post("/register",(req,res)=>{
    const registrationInfo=req.body;
    //////// add data into mongodb or rewrite json with new data 
})

export default router