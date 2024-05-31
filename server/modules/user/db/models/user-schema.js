import mongoose from "../../../../shared/sharedDB/connection.js";

import { Schema, SchemaType } from "mongoose";
import { AppConstants } from "../../../../shared/utils/constants/config.js";

const userSchema = new Schema({
    name: {
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
        maxlength: 100,
    },
    role:[{type:SchemaType.ObjectId,ref:"roles"}],
    firstTimePasswordReset:{type:SchemaType.String,default:"N"}
});
// userSchema.index({ email: 1 })
userSchema.index({ email: 1}, { unique: true })
export const userModel=mongoose.model(AppConstants.SCHEMA.USERS_SCHEMA, userSchema)