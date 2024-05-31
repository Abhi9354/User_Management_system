import { Schema, SchemaTypes } from "mongoose";
import mongoose from "../../../../shared/sharedDB/connection";

const rightSchema = new Schema({
    'name':{type:SchemaTypes.String, required:true, unique:true},
    'desc':{type:SchemaTypes.String, maxLength:70, minLength:8, required:true},
    'action':{type:SchemaTypes.String},
    'status':{type:SchemaTypes.String, default:'A'}
});
export const RightModel = mongoose.model('rights', rightSchema);

