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
        primaryKey: true
    },
    pacienteId: {
        type: DataTypes.INTEGER,
        references: {
            model: Paciente,
            key: 'id'
        }
    },
    monto: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    metodoPago: {
        type: DataTypes.STRING,
        defaultValue: "efectivo"
    },
    descripcion: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    medicoId : {
        type: DataTypes.INTEGER,
        references: {
            model: Medico,
            key: 'id'
        }
    },
    secretariaId : {
        type: DataTypes.INTEGER,
        references: {
            model: Secretaria,
            key: 'id'
        }
    },
    horarioId : {
        type: DataTypes.INTEGER,
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
