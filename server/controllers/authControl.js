import bcrypt from 'bcrypt';
import supabase from '../config/supabaseClient.js';

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign role based on email
    const role = email.endsWith('@admin') ? 'admin' : 'user';

    // Insert user into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          role,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        role: data[0].role,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      });
    }

    // Find user by email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    // Compare password
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        error: 'Invalid password',
      });
    }

    // Ensure admin accounts use @admin emails
    if (
      user.role === 'admin' &&
      !user.email.endsWith('@admin')
    ) {
      return res.status(400).json({
        error: 'Admin email must end with @admin',
      });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.json({
    message: 'Logout successful',
  });
};