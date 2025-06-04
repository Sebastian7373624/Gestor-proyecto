const authService = require('../services/auth.service');
console.log('authService:', authService);

// Controlador para manejar la autenticación de usuarios
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const token = await authService.loginUser(email, password);
    console.log('Inicio de sesión exitoso. Token:', token);
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('ERROR INTERNO AL INICIAR SESIÓN:', error);
    res.status(400).json({ message: 'Error al iniciar sesión: ' + error.message });
  }
};
// Exporta el controlador para usarlo en las rutas