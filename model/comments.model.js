import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    content: String,
    createdBy: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
   
    },
    
  },

  { timestamps: true }
);

const commentsModel = mongoose.model("comments", commentsSchema);
export default commentsModel;
