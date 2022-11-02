import trashCanModel from "../../../model/trashcan.model.js";
import userModel from "../../../model/user.model.js";
import postsModel from "../../../model/posts.model.js";
import commentsModel from "../../../model/comments.model.js";

import bcrypt from "bcryptjs";
const softDelete = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (user) {
      const user = await userModel.findByIdAndUpdate(
        req.userId,
        { isDeleted: true },
        { new: true }
      );
      const trashUser = await trashCanModel.insertMany(user);
      const deletedUser = await userModel.findByIdAndDelete(req.userId);
      res.json({ message: "user is deleted", deletedUser });
    } else {
      res.json({ message: "id not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const deleteUser = await userModel.findByIdAndDelete(req.userId);
    const posts = await postsModel.deleteMany({ createdBy: req.userId })
    const comments = await commentsModel.deleteMany({createdBy:req.userId})
    if (deleteUser) {
      res.json({ message: "deleted", deleteUser });
    } else {
      res.json({ message: "id not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  let { userName, phone, age } = req.body;

  try {
    const updateUser = await userModel.findByIdAndUpdate(
      req.userId,
      { userName, phone, age },
      { new: true }
    );

    res.json({ message: "updated", updateUser });
  } catch (error) {
    console.log(error);
  }
};

const changPassword = async (req, res) => {
  let { password } = req.body;
  try {
    const hash = await bcrypt.hashSync(password, 4);
    const updatePassword = await userModel.findByIdAndUpdate(
      req.userId,
      { password: hash },
      { new: true }
    );
    res.json({ message: "password updated", updatePassword });
  } catch (error) {
    console.log(error);
  }
};

export { deleteById, updateUser, softDelete, changPassword };
