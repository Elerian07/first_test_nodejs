import trashCanModel from '../../../model/trashcan.model.js';
import userModel from '../../../model/user.model.js';
import postsModel from '../../../model/posts.model.js';

import commentsModel from '../../../model/comments.model.js';

const getPosts = async (req, res) => {
    const posts = await postsModel.find({})
        .populate('createdBy', 'userName -_id')
        .populate('comments', 'createdBy content -_id')
        .select('title content createdAt -_id')
    res.json({ message: "Done", posts })

}

const addPost = async (req, res) => {
    const { title, content } = req.body;
    const addPost = await postsModel({ title, content, createdBy: req.userId })
    const addedPost = await addPost.save();
    res.json({ message: "post added", addPost })
}

const userPosts = async (req, res) => {
    const userPosts = await postsModel.find({ createdBy: req.userId })
        .populate('createdBy', 'userName -_id')
        .populate('comments', 'createdBy content createdAt -_id')
        .select('title content createdAt -_id')
    res.json({ message: "done", userPosts })
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await postsModel.findById({ _id: id })
    if (post) {
        if (post.createdBy.equals(req.userId)) {
            const deletePost = await postsModel.findByIdAndDelete({ _id: id })
            const deleteComment = await commentsModel.deleteMany({ _id: post.comments })

            res.json({ message: "post has been deleted", deletePost })
        } else {
            res.json({ message: "you are not authorized to delete this post" })
        }

    } else {
        res.json({ message: "can not find the post" })
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    let { title, content } = req.body;
    const post = await postsModel.findById({ _id: id })
    if (post) {
        if (post.createdBy.equals(req.userId)) {
            const updatePost = await postsModel.findByIdAndUpdate({ _id: id }, { title, content }, { new: true })
            res.json({ message: "post has been updated", updatePost })
        } else {
            res.json({ message: "you are not authorized to update this post" })
        }

    } else {
        res.json({ message: "can not find the post" })
    }
}





export {
    getPosts,
    addPost,
    userPosts,
    deletePost,
    updatePost

}