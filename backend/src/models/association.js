const User = require('./user.models');
const Proyect = require('./proyects.models');
const UsersProjects = require('./users_proyects.models');

const Role = require('./rols.models');                 // Modelo Roles
const Permission = require('./permissions.model');     // Modelo Permisos
const RolePermission = require('./roles_permisos.models'); // Tabla intermedia Roles-Permisos

// Asociaciones User - Proyects (ya tienes)
User.belongsToMany(Proyect, { 
    through: UsersProjects,
    foreignKey: 'user_id',          
    as: 'userproyects'              
});

Proyect.belongsToMany(User, {  
    through: UsersProjects,
    foreignKey: 'proyect_id',       
    as: 'proyectusers'              
});

Proyect.belongsTo(User, {
    foreignKey: 'administrator_id',
    as: 'administrator'             
});

// Asociaciones Roles - Permisos (muchos a muchos)
Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: 'role_id',
    otherKey: 'permission_id',
    as: 'permissions'
});

Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: 'permission_id',
    otherKey: 'role_id',
    as: 'roles'
});

module.exports = { User, Proyect, UsersProjects, Role, Permission, RolePermission };
// Exportamos los modelos para que puedan ser utilizados en otros archivos