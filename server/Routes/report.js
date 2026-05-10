import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

router.post("/report", async (req, res) => {
    const { title, description, location, user_id } = req.body;

    const { data, error } = await supabase
        .from("Reports")
        .insert([{ title, description, location, user_id }]);

    if (error) return res.status(400).json({ error });

    res.json(data);
});

router.get("/reports", async (req, res) => {
    const { data, error } = await supabase
        .from("Reports")
        .select("*");

    if (error) return res.status(400).json({ error });

    res.json(data);
});

router.put("/reports/:id", async (req, res) => {
    const { status } = req.body;

    const { data, error } = await supabase
        .from("Reports")
        .update({ status })
        .eq("id", req.params.id);

    if (error) return res.status(400).json({ error });

    res.json(data);
});

router.delete("/reports/:id", async (req, res) => {
    const { data, error } = await supabase
        .from("Reports")
        .delete()
        .eq("id", req.params.id);

    if (error) return res.status(400).json({ error });

    res.json(data);
});

export default router;