const sequelize = require('./config/database'); // Importa la configuración de Sequelize
const app = require('./app');
const dotenv = require('dotenv'); 
require('./models/association'); 

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequelize');

        // Sincronizar la base de datos antes de iniciar el servidor
        return sequelize.sync({ force: false });
    })
    .then(() => {
        console.log('Base de datos sincronizada');

        // Iniciar el servidor solo después de la sincronización
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error en la conexión o sincronización de la base de datos:', err);
    });
