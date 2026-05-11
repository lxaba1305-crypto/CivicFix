import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

// POST - CREATE A NEW REPORT
router.post("/", async (req, res) => {
    try {
        const { title, description, location, category, full_name, user_id } = req.body;

        // Validate required fields
        if (!title || !description || !location || !category || !full_name) {
            return res.status(400).json({ 
                error: "Missing required fields: title, description, location, category, full_name" 
            });
        }

        const { data, error } = await supabase
            .from("Reports")
            .insert([{ 
                title, 
                description, 
                location, 
                category,
                full_name,
                user_id,
                status: "pending",
                created_at: new Date().toISOString()
            }])
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({ 
            message: "Report created successfully",
            data: data[0]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - FETCH ALL REPORTS
router.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("Reports")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json(data || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - UPDATE REPORT STATUS
router.put("/:id", async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!status) {
            return res.status(400).json({ error: "Status is required" });
        }

        const { data, error } = await supabase
            .from("Reports")
            .update({ status })
            .eq("id", id)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Report not found" });
        }

        res.json({ 
            message: "Report updated successfully",
            data: data[0]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - DELETE A REPORT
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("Reports")
            .delete()
            .eq("id", id)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Report not found" });
        }

        res.json({ 
            message: "Report deleted successfully",
            data: data[0]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;