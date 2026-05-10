import express from 'express';
import bcrypt from 'bcrypt';
import supabase from '../config/supabaseClient.js';

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          role: "user"
        }
      ])
      .select();

    if (error) {
        console.log(error);
      console.log("SUPABASE ERROR:", error);

      return res.status(400).json({
        error: error.message
      });
    }

    res.json({
      message: "User created successfully",
      user: data[0]
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
        .from('users')
        .select()
        .eq('email', email)
        .single();

    if (error || !user) {
        return res.status(400).json({ 
            error: "User not found" 
        });
    }

const validPassword = await bcrypt.compare(
    password,
    user.password
);

if (!validPassword) {
    return res.status(400).json({
        error: "Invalid password"
    });
}

res.json({
    message: "Login successful",
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});
});

export default router;