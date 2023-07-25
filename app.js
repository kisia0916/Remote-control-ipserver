const express = require("express")
const app = express()
const fs = require("fs")
const body_pase = require("body-parser")
const path = require("path")
const ipfile = fs.readFileSync("./serverip.txt","utf-8")

app.use(express.json())
app.use(body_pase.json());//////////////////////////////   ここ重要
app.use(body_pase.urlencoded({ extended: true }));//////
app.use(express.static(path.join(__dirname, "js")));

app.get("/",(req,res)=>{
    return res.status(200).json(ipfile)
})
app.get("/set",(req,res)=>{
    let host = req.body.hostname
    let port = req.body.port
    let writeData = host+":"+port
    fs.writeFileSync("./serverip.txt",writeData)
    return res.status(200).json("done")
})
app.listen(3000,()=>{
    console.log("server run")
})