// Importamos los módulos necesarios
const express = require('express'); 
const cors = require('cors'); 
const morgan = require('morgan');
require('dotenv').config(); // Carga las variables de entorno

// Creamos la instancia de Express
const app = express();

// Middleware de logs HTTP
app.use(morgan('dev'));

// Middleware para manejar errores genéricos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Configuración para procesar JSON y permitir CORS
app.use(express.json());
app.use(cors());

// Importamos las rutas
const userRoutes = require('./routes/user.routes'); 
const authRoutes = require('./routes/auth.routes'); 
const proyectRoutes = require('./routes/proyect.routes');

// Asociamos las rutas con su prefijo
app.use('/api/v1', userRoutes); 
app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/proyects', proyectRoutes);

// Exportamos la app
module.exports = app;
