import mongoose from "../../../../Backend/shared/sharedDB/connection.js";
const schema = mongoose.Schema;

const userSchema = new schema({name: {
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

export const userModel = mongoose.model("usersStore", userSchema)
