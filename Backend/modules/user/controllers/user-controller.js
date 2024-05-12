import { AppConstants } from "../../../shared/utils/constants/config.js";
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
      res.status(AppConstants.SUCCESS_CODES).json({"message":`${doc.name}`+" logged in successfully","doc":userData})
    }
    else{
      res.status(AppConstants.ERROR_CODES.AUTH_FAILED).json({"message":"Inavalid login credentials"}) 
    }
  } catch (error) {
    res.status(AppConstants.ERROR_CODES.INTERNAL_SERVER_ERROR).json({"message":"Internal server error"})
  }
};
export const profile = (req, res) => {
  res.send("profile");
};
export const remove = (req, res) => {
  res.send("remove");
};
