import express from "express";
import {
  createHotel,
  deleteHotel,
  findAllHotel,
  findHotel,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel);

router.put("/:id", verifyAdmin, updateHotel);

router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/:id", findHotel);

router.get("/", findAllHotel);

export default router;
