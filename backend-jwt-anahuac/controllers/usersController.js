const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crearToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
exports.crearUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (typeof nombre !== 'string' || !nombre.trim() || typeof email !== 'string' || !email.includes('@') || typeof password !== 'string' || password.length < 6)
      return res.status(400).json({ mensaje: 'Nombre, email y password (minimo 6 caracteres) requeridos' });
    if (await User.exists({ email: email.trim().toLowerCase() })) return res.status(409).json({ mensaje: 'El correo ya existe' });
    const user = await User.create({ nombre: nombre.trim(), email: email.trim().toLowerCase(), password: await bcrypt.hash(password, 10) });
    return res.status(201).json({ _id: user.id, nombre: user.nombre, email: user.email });
  } catch (e) { if (e.code === 11000) return res.status(409).json({ mensaje: 'El correo ya existe' }); throw e; }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== 'string' || typeof password !== 'string') return res.status(401).json({ mensaje: 'Credenciales invalidas' });
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ mensaje: 'Credenciales invalidas' });
  return res.json({ _id: user.id, nombre: user.nombre, email: user.email, token: crearToken(user.id) });
};
exports.datosUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(401).json({ mensaje: 'Usuario no encontrado' });
  return res.json({ _id: user.id, nombre: user.nombre, email: user.email });
};
