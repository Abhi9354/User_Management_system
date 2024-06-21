import { Schema, SchemaTypes } from "mongoose";
import mongoose from "../../../../shared/sharedDB/connection.js";

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  desc: {
    type: SchemaTypes.String,
    maxLength: 100,
    minLength: 10,
    required: true,
  },
  status: {
    type: SchemaTypes.String,
    default: "A",
  },
  permissions: [{ type: SchemaTypes.ObjectId, ref: "permission" }],
});

export const RoleModel=mongoose.model("roles",roleSchema)
