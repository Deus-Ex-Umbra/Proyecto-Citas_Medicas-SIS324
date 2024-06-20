import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Perfil } from './perfil.js';

export const Medico = sequelize.define('medico', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING,
        defaultValue: "general"
    },
    turno: {
        type: DataTypes.STRING,
        default: ""
    },
    perfilId: {
        type: DataTypes.INTEGER,
        references: {
            model: Perfil,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: false
});

Perfil.hasMany(Medico, { foreignKey: 'perfilId' });
Medico.belongsTo(Perfil, { foreignKey: 'perfilId' });
