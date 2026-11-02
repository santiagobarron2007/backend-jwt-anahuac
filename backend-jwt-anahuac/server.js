require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/usersRoutes');
const tareasRoutes = require('./routes/tareasRoutes');
const app = express();
app.use(express.json());
app.get('/', (_req, res) => res.json({ mensaje: 'API JWT funcionando' }));
app.use('/api/users', usersRoutes);
app.use('/api/tareas', tareasRoutes);
app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && 'body' in err) return res.status(400).json({ mensaje: 'JSON invalido' });
  console.error(err);
  return res.status(500).json({ mensaje: 'Error interno del servidor' });
});
async function iniciar() {
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) throw new Error('Configura MONGO_URI y JWT_SECRET en .env');
  await mongoose.connect(process.env.MONGO_URI);
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`API lista: http://localhost:${port}`));
}
if (require.main === module) iniciar().catch(e => {console.error(e.message); process.exit(1)});
module.exports = app;
