app.post("/report", async (req, res) => {
    const { title, description, location, user_id } = req.body;

    const { data, error } = await supabase
        .from("reports")
        .insert([{ title, description, location, user_id }]);

    if (error) return res.status(400).json({ error });

    res.json(data);
});

app.get("/reports", async (req, res) => {
    const { data, error } = await supabase
        .from("reports")
        .select("*");

    if (error) return res.status(400).json({ error });

    res.json(data);
});

app.put("/reports/:id", async (req, res) => {
    const { status } = req.body;

    const { data, error } = await supabase
        .from("reports")
        .update({ status })
        .eq("id", req.params.id);

    if (error) return res.status(400).json({ error });

    res.json(data);
});

app.delete("/reports/:id", async (req, res) => {
    const { data, error } = await supabase
        .from("reports")
        .delete()
        .eq("id", req.params.id);

    if (error) return res.status(400).json({ error });

    res.json(data);
});