const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user.models');

dotenv.config(); // cargar variables .env
const JWT_SECRET = process.env.JWT_SECRET;

// LOGIN
exports.loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    console.log('Usuario no encontrado con email:', email);
    throw new Error('Usuario no encontrado');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    console.log('Contraseña incorrecta para:', email);
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, rol_id: user.rol_id },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
};

// VERIFICACIÓN DIRECTA
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token inválido:', error.message);
    throw new Error('Token inválido');
  }
};

// MIDDLEWARE
exports.verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

// REGISTRO
exports.registerUser = async (email, password, rol_id) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    console.log('Usuario ya existe con email:', email);
    throw new Error('Usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    rol_id
  });

  return newUser;
};
// OBTENER USUARIO POR ID
exports.getUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    console.log('Usuario no encontrado con ID:', id);
    throw new Error('Usuario no encontrado');
  }

  return user;
}