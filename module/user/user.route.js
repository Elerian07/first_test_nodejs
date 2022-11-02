import { Router } from "express";
import {
  deleteById,
  updateUser,
  softDelete,
  changPassword,
} from "./controller/user.controller.js";
import auth from "../../middleware/auth.js";
const router = Router();

router.delete("/delete", auth(), deleteById);

router.patch("/update", auth(), updateUser);

router.post("/softDelete", auth(), softDelete);

router.put("/changPassword", auth(), changPassword);

export default router;
