app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hashedPassword, role: "user" }]);
    
    if (error) return res.status(400).json({ error });

    res.json({ message: "User created successfully", user: data[0] });
});