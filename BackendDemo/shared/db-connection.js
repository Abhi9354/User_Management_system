import mongoose from "mongoose";

export const dbConnectionLoad = () => {
    console.log('connection file loaded by demo');
    const promise= mongoose.connect(process.env.DB_URL)
    return promise
};
