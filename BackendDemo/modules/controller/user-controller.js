export const login = (req, res) => {
    console.log('login');
    res.json({"message":"succesfully login"});
};
export const register = (req, res) => {
    const data =req.body

    res.send("register");
};
export const profile = (req, res) => {
    res.send("profile");
};
export const remove = (req, res) => {
    res.send("remove");
}