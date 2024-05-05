import mongoose from "../../../shared/db-connection.js"
import { Schema } from "mongoose";
const userSchema = new Schema({name: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
    unique:true

},
password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 12,
},
})

export const userModel = mongoose.model("users", userSchema)
