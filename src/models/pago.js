import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Paciente } from '../models/paciente.js';
import { Medico } from '../models/medico.js';
import { Secretaria } from '../models/secretaria.js';
import { Horario } from '../models/horario.js';

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
    },
    medicoId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Medico,
            key: 'id'
        }
    },
    secretariaId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Secretaria,
            key: 'id'
        }
    },
    horarioId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Horario,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

Paciente.hasMany(Pago, { foreignKey: 'pacienteId' });
Pago.belongsTo(Paciente, { foreignKey: 'pacienteId' });

Medico.hasMany(Pago, { foreignKey: 'medicoId' });
Pago.belongsTo(Medico, { foreignKey: 'medicoId' });

Secretaria.hasMany(Pago, { foreignKey: 'secretaria' });
Pago.belongsTo(Secretaria, { foreignKey: 'secretaria' });

Horario.hasMany(Pago, { foreignKey: 'horarioId' });
Pago.belongsTo(Horario, { foreignKey: 'horarioId' });
