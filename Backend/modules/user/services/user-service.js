import { userModel } from "../db/models/user-schema.js";

export const userService =  {
   async register(userData){
    try{
        const doc=  await userModel.create(userData)
        console.log('doc user sericive',doc);
        return doc
    }catch(err){
          console.log('err',err);
    }
   
    }
};