import express from "express"
import dotenv from "dotenv"
import { router } from "./modules/routes/routes.js";
import {dbConnectionLoad} from "./shared/db-connection.js"
dotenv.config();
const app= express()

app.use(express.json())
app.use('/',router)

dbConnectionLoad().then(()=>{
    app.listen(process.env.PORT||1234,()=>{
        console.log("server is running on port " + process.env.PORT)
    })
}).catch((err)=>{
    console.log(err);
})

