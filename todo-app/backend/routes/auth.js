const express = require("express");
const router = express.Router(); // 🔥 Aquí definimos `router`
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registro
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send("Usuario registrado correctamente");
  } catch (error) {
    console.error("❌ Error registrando usuario:", error);
    res.status(400).send("Error registrando usuario");
  }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Credenciales inválidas." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenciales inválidas." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
});

module.exports = router; // 🔥 Exportar correctamente el `router`
