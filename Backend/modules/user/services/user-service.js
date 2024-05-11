import { hashPassword, verifyPassword } from "../../../shared/utils/password-hash.js";
import { userModel } from "../db/models/user-schema.js";

export const userService =  {
   async register(userData){
    try{
        userData.password=hashPassword(userData.password)
        const doc=  await userModel.create(userData)
        console.log('doc user sericive',doc);
        return doc
    }catch(err){
          console.log('err',err);
    }
   
    },
    async login(userData){
        try{
            const doc=await userModel.findOne({"email":userData.email}).select("name password -_id").exec()
            console.log('doc ',doc);
            if(doc){
             const hashPassword=doc.password;
             const plaintextPassword=userData.password;
             const isMatch= verifyPassword(plaintextPassword,hashPassword)
             if(isMatch){
                 return {name:doc.name};
             }
             else{
                 return null
             }
            }
            else{
                console.log('user not found');
            }
        }
        catch(err){
            console.log('err',err);
        }
        
    }
};