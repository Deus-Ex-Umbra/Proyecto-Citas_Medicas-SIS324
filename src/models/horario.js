import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Medico } from '../models/medico.js';

export const Horario = sequelize.define('horario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    turno: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    dia: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    tiempoConsulta: {
        type: DataTypes.INTEGER,
        defaultValue: 15
    },
    horaInicio: {
        type: DataTypes.INTEGER,
        defaultValue: 8
    },
    horaFin: {
        type: DataTypes.INTEGER,
        defaultValue: 12
    },
    medicoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Medico,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: false
});

Medico.hasMany(Horario, { foreignKey: 'medicoId', as: 'horarios' });
Horario.belongsTo(Medico, { foreignKey: 'medicoId', as: 'medico' });
