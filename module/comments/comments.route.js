import { Router } from 'express';
import auth from '../../middleware/auth.js';
import {addComment,deleteComment,updateComment} from './controller/comments.controller.js'
const router = Router();

router.post("/addComment",auth(),addComment)
router.delete("/deleteComment/:id",auth(),deleteComment)
router.put("/updateComment/:id",auth(),updateComment)
export default router;