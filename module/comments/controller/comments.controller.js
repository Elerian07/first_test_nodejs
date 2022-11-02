
import postsModel from '../../../model/posts.model.js';
import commentsModel from '../../../model/comments.model.js';

const addComment = async (req, res) => {
    let { content, postId } = req.body;
    const comment = await commentsModel({ content, createdBy: req.userId })
    const addedComment = await comment.save()
    const addToPost = await postsModel.findByIdAndUpdate({ _id: postId }, { comments: [comment] })


    res.json({ message: "comment has been added", comment })

}

const deleteComment = async (req, res) => {
    const { id } = req.params;
    const comment = await commentsModel.findById({ _id: id })
    if (comment) {
        if (comment.createdBy.equals(req.userId)) {
            const deleteComment = await commentsModel.findByIdAndDelete({ _id: id })
            res.json({ message: "comment has been deleted", deleteComment })
        } else {
            res.json({ message: "you are not authorized to delete this comment" })
        }

    } else {
        res.json({ message: "can not find the comment" })
    }
}


const updateComment = async (req, res) => {
    const { id } = req.params;
    let { content } = req.body;
    const comment = await commentsModel.findById({ _id: id })
    if (comment) {
        if (comment.createdBy.equals(req.userId)) {
            const updateComment = await commentsModel.findByIdAndUpdate({ _id: id }, { content }, { new: true })
            res.json({ message: "post has been updated", updateComment })
        } else {
            res.json({ message: "you are not authorized to update this comment" })
        }

    } else {
        res.json({ message: "can not find the comment" })
    }
}

export {
    addComment,
    deleteComment,
    updateComment
}