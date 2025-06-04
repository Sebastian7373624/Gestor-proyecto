const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/database'); // cambia a "sequelize" para evitar confusión

const Rols = sequelize.define('rols', { 
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    }
}, {
    timestamps: false, 
    tableName: 'rols',
});

module.exports = Rols;
// Exporta el modelo 'rols' para su uso en otras partes del proyecto
// module.exports = Rols; // Esta línea ya está incluida al final del código