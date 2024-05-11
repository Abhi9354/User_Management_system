import { userService } from "../services/user-service.js";

export const register = async (req, res) => {
  const data = req.body;
  try {
    const doc = await userService.register(data);
    if(doc._id){
        console.log('doc ',doc);
        res.json({"message":"success","doc":doc})
    }

    else{
        res.json({"message":"fail"})
    }
  } catch (err) {
    console.log("err",err);
    throw err;
  }
};
export const login = async(req, res) => {

  const userData= req.body;
  try {
    const doc = await userService.login(userData);
    console.log('doc controller ',doc);
    if(doc){
      res.status(200).json({"message":`${doc.name}`+" logged in successfully","doc":userData})
    }
    else{
      res.status(400).json({"message":"Inavalid login credentials"}) 
    }
  } catch (error) {
    
  }
};
export const profile = (req, res) => {
  res.send("profile");
};
export const remove = (req, res) => {
  res.send("remove");
};
