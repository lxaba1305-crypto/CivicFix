import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";
import authRoutes from "./Routes/authRoutes.js";
import reports from "./Routes/report.js";
import ws from "ws";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CivicFix API is running");
});

app.use("/auth", authRoutes);
app.use("/reports", reports);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});