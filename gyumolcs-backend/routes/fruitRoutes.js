import express from "express";
import {
  getGyumolcsok,
  getGyumolcsById,
  createGyumolcs,
  updateGyumolcs,
  deleteGyumolcs
} from "../controllers/gyumolcsController.js";
 
const router = express.Router();
 
router.get("/", getGyumolcsok);
router.get("/:id", getGyumolcsById);
router.post("/", createGyumolcs);
router.put("/:id", updateGyumolcs);
router.delete("/:id", deleteGyumolcs);
 
export default router;