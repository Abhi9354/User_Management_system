import {
  hashPassword,
  verifyPassword,
} from "../../../shared/utils/password-hash.js";
import { PermissionModel } from "../db/models/permission-schema.js";
import { RoleModel } from "../db/models/role-schema.js";
import { userModel } from "../db/models/user-schema.js";

export const userService = {
  async register(userData) {
    try {
      const existingUser = await userModel.findOne({ email: userData.email });
      if (existingUser) {
        return null;
      }

      let roleIds = [];
      if (!userData.role) {
        const defaultRole = await RoleModel.findOne({ name: "USER" });
        roleIds = [defaultRole._id];
  
        const getUserPermission = await PermissionModel.findOne({
            name: "GetUser",
          });
          defaultRole.permissions.push(getUserPermission._id);
          await defaultRole.save();
        }

        else {
            const role = await RoleModel.findOne({ name: userData.role });
            if (!role) {
              throw new Error("Role not found");
            }
            roleIds = [role._id];
    
            if (role.name === "ADMIN") {
              const allRoles = await RoleModel.find();
              roleIds = allRoles.map((role) => role._id);
    
              const getUserPermission = await PermissionModel.findOne({
                name: "GetUser",
              });
              const addUserPermission = await PermissionModel.findOne({
                name: "AddUser",
              });
              role.permissions.push(getUserPermission._id, addUserPermission._id);
              await role.save();
            } else {
              // Add "GetUser" permission to other roles
              const getUserPermission = await PermissionModel.findOne({
                name: "GetUser",
              });
              role.permissions.push(getUserPermission._id);
              await role.save();
            }
          }

      userData.password = await hashPassword(userData.password);
    //   const doc = await userModel.create(userData);
      console.log("service screen");
      const newUser = await userModel({ ...userData, role: roleIds }).save();
      return newUser;
    } catch (err) {
      throw err;
    }
  },
  async login(userData) {
    try {
      const doc = await userModel
        .findOne({ email: userData.email })
        .select("name password -_id")
        .exec();
      if (doc) {
        const hashPassword = doc.password;
        const plaintextPassword = userData.password;
        const isMatch = verifyPassword(plaintextPassword, hashPassword);
        if (isMatch) {
          return { name: doc.name };
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  },

  async changePassword(userId, oldPassword, newPassword) {
    const user = await userModel.findById(userId).select("+password");

    if (!user) {
      throw new Error("User not found");
    }

    const isMatchOldPassword = await comparePassword(password, user.password);

    if (!isMatchOldPassword) {
      return null;
    }

    user.password = await passwordHashing(newPassword);
    await user.save();

    return user;
  },

  async getAllUsers(userId) {
    const user = await userModel.findById(userId).populate({
      path: "role",
      populate: {
        path: "permissions",
        model: "permissions",
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const hasGetUserPermission = user.role.some((role) =>
      role.permissions.some((permission) => permission.name === "GetUser")
    );

    if (!hasGetUserPermission) {
      throw new Error("You do not have permission to get users");
    }

    const users = await userModel.find({ is_deleted: false }).populate("role");
    return users;
  },

  async deleteUser(userId, deleteUserId) {
    const user = await userModel.findOne({
      _id: userId,
      is_deleted: false,
    }).populate({
      path: "role",
      populate: {
        path: "permissions",
        model: "permissions",
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const hasDeleteUserPermission = user.role.some((role) =>
      role.permissions.some((permission) => permission.name === "DeleteUser")
    );

    if (!hasDeleteUserPermission) {
      throw new Error("You do not have permission to Delete users");
    }

    const userToDelete = await userModel.findOne({
      _id: deleteUserId,
      is_deleted: false,
    }).populate("role");

    if (!userToDelete) {
      throw new Error("User not found");
    }

    if (!userToDelete) {
      return null;
    }

    userToDelete.is_deleted = true;
    await userToDelete.save();

    return user;
  },
};
