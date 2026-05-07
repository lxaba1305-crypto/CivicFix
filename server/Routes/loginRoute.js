app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

    if (error || !users) {
    return res.status(400).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, users.password);

    if (!validPassword) {
    return res.status(400).json({ error: "Invalid password" });
    }

    res.json({ message: "Login successful", 
        user: {
            id: users.id,
            email: users.email,
            role: users.role
        } 
    });
});
