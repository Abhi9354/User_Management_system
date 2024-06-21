import { Schema, SchemaTypes } from "mongoose";
import mongoose from "../../../../shared/sharedDB/connection.js";


const permissionSchema = new Schema({
    name: { type: SchemaTypes.String, required: true, unique: true },
    desc: {
      type: SchemaTypes.String,
      maxLength: 70,
      minLength: 8,
      required: true,
    },
    rights: [{ type: SchemaTypes.ObjectId, ref: "rights" }],
  });
  export const PermissionModel = mongoose.model("permissions", permissionSchema);