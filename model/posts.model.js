import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    createdBy: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    comments: [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref: "comments",
        default: [],
        
      }]
    
  },
  { timestamps: true }
);

const postsModel = mongoose.model("posts", postsSchema);
export default postsModel;
