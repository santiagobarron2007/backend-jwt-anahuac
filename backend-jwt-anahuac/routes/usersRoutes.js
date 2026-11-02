const router = require('express').Router();
const { crearUser, loginUser, datosUser } = require('../controllers/usersController');
const protect = require('../middleware/protect');
const handler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.post('/', handler(crearUser));
router.post('/login', handler(loginUser));
router.get('/datos', protect, handler(datosUser));
module.exports = router;
