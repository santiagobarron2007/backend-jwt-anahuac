const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async function protect(req, res, next) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return res.status(401).json({ mensaje: 'Token requerido' });
  const token = auth.slice(7).trim();
  if (!token) return res.status(401).json({ mensaje: 'Token requerido' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ mensaje: 'Usuario no valido' });
    req.user = { id: user._id.toString() };
    next();
  } catch (_err) { return res.status(401).json({ mensaje: 'Token invalido o expirado' }); }
};
