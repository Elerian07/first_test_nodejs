import { Router } from 'express';
import {getPosts,addPost,userPosts,deletePost,updatePost } from './controller/posts.controller.js';
import auth from '../../middleware/auth.js';
const router = Router();

router.get("/getAllPosts", getPosts)

router.post("/addPost", auth(), addPost)

router.get("/userPosts", auth(), userPosts)

router.delete("/deletePosts/:id", auth(), deletePost)

router.put("/updatePost/:id",auth(),updatePost)
export default router;