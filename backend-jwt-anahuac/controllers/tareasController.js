const mongoose = require('mongoose');
const Tarea = require('../models/Tarea');
exports.getTareas = async (req, res) => res.json(await Tarea.find({ usuario: req.user.id }).sort({ createdAt: -1 }));
exports.createTareas = async (req, res) => {
  const { titulo, descripcion, completada } = req.body;
  if (typeof titulo !== 'string' || !titulo.trim()) return res.status(400).json({ mensaje: 'El titulo es obligatorio' });
  const tarea = await Tarea.create({ titulo: titulo.trim(), descripcion: typeof descripcion === 'string' ? descripcion : '', completada: completada === true, usuario: req.user.id });
  return res.status(201).json(tarea);
};
exports.updateTareas = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  const cambios = {};
  if (req.body.titulo !== undefined) {
    if (typeof req.body.titulo !== 'string' || !req.body.titulo.trim()) return res.status(400).json({ mensaje: 'Titulo invalido' });
    cambios.titulo = req.body.titulo.trim();
  }
  if (req.body.descripcion !== undefined) {
    if (typeof req.body.descripcion !== 'string') return res.status(400).json({ mensaje: 'Descripcion invalida' });
    cambios.descripcion = req.body.descripcion;
  }
  if (req.body.completada !== undefined) {
    if (typeof req.body.completada !== 'boolean') return res.status(400).json({ mensaje: 'Completada debe ser booleano' });
    cambios.completada = req.body.completada;
  }
  const tarea = await Tarea.findOneAndUpdate({ _id: req.params.id, usuario: req.user.id }, { $set: cambios }, { new: true, runValidators: true });
  if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  return res.json(tarea);
};
exports.deleteTareas = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  const tarea = await Tarea.findOneAndDelete({ _id: req.params.id, usuario: req.user.id });
  if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  return res.json({ mensaje: 'Tarea eliminada', _id: tarea.id });
};
