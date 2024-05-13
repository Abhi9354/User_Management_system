import { AppConstants } from "../../../shared/utils/constants/config.js";
import { loadMessageBundler } from "../../../shared/utils/constants/i18n/messageReader.js";
import { generateToken, verifyToken } from "../../../shared/utils/token.js";
import { userService } from "../services/user-service.js";
export const register = async (req, res) => {
  const data = req.body;
  try {
    const doc = await userService.register(data);
    if(doc._id){
        res.json({"message":"success","doc":doc})
    }

    else{
        res.json({"message":"fail"})
    }
  } catch (err) {
    throw err;
  }
};
export const login = async(req, res) => {

  const userData= req.body;
  try {
    const doc = await userService.login(userData);
    if(doc){

      //generate the token
      const token=generateToken(doc.email)
const message=loadMessageBundler();
res.status(AppConstants.SUCCESS_CODES).json({"message":`${doc.name} `+ message['login.success'],"doc":userData,"token":token})
    }
    else{
      res.status(AppConstants.ERROR_CODES.AUTH_FAILED).json({"message":message.login.failed}) 
    }
  } catch (error) {
    throw error
    // res.status(AppConstants.ERROR_CODES.INTERNAL_SERVER_ERROR).json({"message":"Internal server error"})
  }
};
export const profile = (req, res) => {
  const auth=req.headers['authorization']
  if(verifyToken(auth)){
  res.send("profile");
    
  }
  else{
    res.status(AppConstants.ERROR_CODES.AUTH_FAILED).json({"message":"authorization failed failed"})
  }
};
export const remove = (req, res) => {
  res.send("remove");
};
