import express from 'express';
import bcrypt from 'bcrypt';
import supabase from '../config/supabaseClient.js';

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password: hashedPassword }])
        .select()
        
    if (error) return res.status(400).json({ error });

    res.json({
        message: "User created successfully",
        user: data[0]
    });
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
        email: user.email,
        role: user.role
    }
});
});

export default router;