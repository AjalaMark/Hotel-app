import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

import {
  deleteUser,
  findAllUser,
  findUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/checkAuthentication", verifyToken, (req, res, next) => {
  res.send("Hello user, you are logged in");
});

router.get("/checkUser/:id", verifyUser, (req, res, next) => {
  res.send("Hello user, you are logged in and you can delete your account");
});

router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello admin, you are logged in and you can delete all users");
});

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, findUser);

router.get("/", verifyAdmin, findAllUser);

export default router;
