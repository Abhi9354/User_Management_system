import { AppConstants } from "../../../shared/utils/constants/config.js";
import { loadMessageBundler } from "../../../shared/utils/constants/i18n/messageReader.js";
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
const message=loadMessageBundler();
res.status(AppConstants.SUCCESS_CODES).json({"message":`${doc.name} `+ message['login.success'],"doc":userData})
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
  res.send("profile");
};
export const remove = (req, res) => {
  res.send("remove");
};
