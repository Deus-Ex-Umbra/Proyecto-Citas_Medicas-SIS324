import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Perfil } from './perfil.js';

export const Horario = sequelize.define('horario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    turno: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "disponible",
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        defaultValue: "00:00:00",
        allowNull: false
    },
    perfilId: {
        type: DataTypes.INTEGER,
        references: {
            model: Perfil,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: false
});

Perfil.hasMany(Horario, { foreignKey: 'perfilId', as: 'horarios' });
Horario.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'perfil' });
