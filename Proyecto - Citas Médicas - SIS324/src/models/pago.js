import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Paciente } from '../models/paciente.js';

export const Pago = sequelize.define('pago', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    pacienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Paciente,
            key: 'id'
        }
    },
    monto: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    metodoPago: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
});

Paciente.hasMany(Pago, { foreignKey: 'pacienteId' });
Pago.belongsTo(Paciente, { foreignKey: 'pacienteId' });
