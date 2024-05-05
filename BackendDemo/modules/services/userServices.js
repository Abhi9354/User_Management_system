import { userModel } from "../db/model/userSchema.js";

export const userCrud ={
    async register(userData){
        try{
            const doc=  await userModel.create(userData)
            return doc
        }catch(err){
              console.log('err',err);
        }
       
        }
};