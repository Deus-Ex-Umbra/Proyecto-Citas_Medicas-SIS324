import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Medico } from '../models/medico.js';
import { Horario } from '../models/horario.js';

export const ItemHorario = sequelize.define('itemHorario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "disponible"
    },
    horarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Horario,
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    medicoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Medico,
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }
}, {
    timestamps: false
});

Horario.hasMany(ItemHorario, { foreignKey: 'horarioId', as: 'itemHorarios' });
ItemHorario.belongsTo(Horario, { foreignKey: 'horarioId', as: 'horario' });

Medico.hasMany(ItemHorario, { foreignKey: 'medicoId', as: 'itemHorarios' });
ItemHorario.belongsTo(Medico, { foreignKey: 'medicoId', as: 'medico' });
