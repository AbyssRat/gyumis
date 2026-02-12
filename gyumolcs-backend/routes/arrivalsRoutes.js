import express from "express";
import {
  getErkezesek,
  createErkezes
} from "../controllers/arrivalsController.js";
 
const router = express.Router();
 
router.get("/", getErkezesek);
router.post("/", createErkezes);
 
export default router;