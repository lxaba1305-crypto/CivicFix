import express from "express";
import { createReport, getReports, updateReport, deleteReport } from "../controllers/reportController.js";

const router = express.Router();

// CREATE
router.post("/", createReport);

// READ
router.get("/", getReports);

// UPDATE
router.put("/:id", updateReport);

// DELETE
router.delete("/:id", deleteReport);

export default router;