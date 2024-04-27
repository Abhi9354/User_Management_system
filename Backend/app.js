import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { userRouter } from "./modules/user/routes/user-routes.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use('/',userRouter)//middleware it just a function

const server=app.listen(process.env.PORT||1234, (err) => {
    if(err){
        chalk.red(err);
    }else{
        console.log(chalk.green("server is running on port ",server.address().port));
    }
})