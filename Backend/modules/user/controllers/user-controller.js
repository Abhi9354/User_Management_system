export const register = (req,res)=>{
    const data=req.body
    data["message"]="user registered successfully"
    res.send(data)
}
export const login = (req,res)=>{
    res.send("login")
}
export const profile = (req,res)=>{
    res.send("profile")
}
export const remove = (req,res)=>{
    res.send("remove")
}