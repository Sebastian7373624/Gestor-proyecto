// Importa DataTypes desde Sequelize 
const { DataTypes } = require('sequelize'); 

// Importa la conexión a la base de datos desde el archivo de configuración 
const sequalize = require('../config/database'); 

// Define el modelo 'roles_permisos' en Sequelize
const roles_permisos = sequalize.define('roles_permisos', {

    // Define la columna 'id' como clave primaria, entera y autoincremental
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
    },

    // Define la columna 'rol_id' como clave foránea referenciada a 'roles_permisos' 
    rol_id: { 
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: { model: 'roles_permisos', key: 'id' }
    },

    // Define la columna 'permisos_id' como clave foránea referenciada a 'permisos'
    permisos_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'permisos', key: 'id' } 
    }

}, {
    // Desactiva las marcas de tiempo automáticas en Sequelize
    timestamps: false, 

    // Define el nombre de la tabla en la base de datos
    tableName: 'roles_permisos',
});

// Exporta el modelo 'roles_permisos' 
module.exports = roles_permisos;
