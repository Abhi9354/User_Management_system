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
    throw new error(err);
  }
};
export const login = (req, res) => {
  res.send("login");
};
export const profile = (req, res) => {
  res.send("profile");
};
export const remove = (req, res) => {
  res.send("remove");
};
