import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Perfil } from '../models/perfil.js';

export const Secretaria = sequelize.define ('secretaria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    turno: {
        type: DataTypes.STRING,
        default: ""
    },
    antiguedad: {
        type: DataTypes.INTEGER,
        default: 1
    },
    fechaContrato: {
        type: DataTypes.DATE,
        default: new Date()
    },
    experiencia: {
        type: DataTypes.STRING,
        default: ""
    },
    estado: {
        type: DataTypes.STRING,
        default: "activo"
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

Perfil.hasMany(Secretaria, { foreignKey: 'perfilId' });
Secretaria.belongsTo(Perfil, { foreignKey: 'perfilId' });