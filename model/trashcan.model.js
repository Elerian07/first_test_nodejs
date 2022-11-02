import mongoose from "mongoose";

const trashCanSchema = new mongoose.Schema({
  userName: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
  phone: Number,
  isDeleted: {
    type: Boolean,
    default: true,
  },

 
});

const trashCanModel = mongoose.model("trash can", trashCanSchema);

export default trashCanModel;
