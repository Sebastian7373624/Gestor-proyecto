const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // importa tu instancia de Sequelize correctamente

const Permisos = sequelize.define('permisos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    timestamps: false,
    tableName: 'permisos',
});

module.exports = Permisos;
// Exporta el modelo 'permisos' para su uso en otras partes del proyecto
// module.exports = Permisos; // Esta línea ya está incluida al final del código