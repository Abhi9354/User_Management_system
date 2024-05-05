import { userCrud } from "../services/userServices.js";

export const login = (req, res) => {
    console.log('login');
    res.json({"message":"succesfully login"});
};
export const register = async(req, res) => {
    const data =req.body
    try {
        const doc= await userCrud.register(data);
        console.log('doc ',doc);
        if(doc){
    res.json({"message":"succesfully register","doc":data});
            
        }
        else{
        res.json({"message":"fail"})

        }
    } catch (error) {
        throw error
    }

};
export const profile = (req, res) => {
    res.send("profile");
};
export const remove = (req, res) => {
    res.send("remove");
}