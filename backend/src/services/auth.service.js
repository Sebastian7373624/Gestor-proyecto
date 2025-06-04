const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

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
    'secreto',
    { expiresIn: '1h' }
  );

  return token;
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'secreto');
    return decoded;
  } catch (error) {
    console.error('Token inválido:', error.message);
    throw new Error('Token inválido');
  }
};
