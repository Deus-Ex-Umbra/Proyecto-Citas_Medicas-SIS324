import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Paciente } from '../models/paciente.js';
import { Secretaria } from '../models/secretaria.js';
import { Medico } from '../models/medico.js';
import { Horario } from '../models/horario.js';

export const Cita = sequelize.define('cita', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fechaHora: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "pendiente",
        allowNull: false
    },
    costo: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false
    },
    tipoConsulta: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false
    },
    formaPago: {
        type: DataTypes.STRING,
        defaultValue: "efectivo",
        allowNull: false
    },
    observacion: {
        type: DataTypes.STRING,
        defaultValue: "Sin Observaciones",
        allowNull: false
    },
    prioridad: {
        type: DataTypes.STRING,
        defaultValue: "normal",
        allowNull: false
    },
    duracion: {
        type: DataTypes.INTEGER,
        defaultValue: 30,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING,
        defaultValue: "consultorio",
        allowNull: false
    },
    pacienteId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'paciente',
            key: 'id'
        }
    },
    secretariaId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'secretaria',
            key: 'id'
        }
    },
    medicoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'medico',
            key: 'id'
        }
    },
    horarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'horario',
            key: 'id'
        }
    }
}, {
    timestamps: false
});

Paciente.hasMany(Cita, { foreignKey: 'pacienteId', as: 'cita'});
Cita.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente'});

Secretaria.hasMany(Cita, { foreignKey: 'secretariaId', as: 'cita'});
Cita.belongsTo(Secretaria, { foreignKey: 'secretariaId', as: 'secretaria'});

Medico.hasMany(Cita, { foreignKey: 'medicoId', as: 'cita'});
Cita.belongsTo(Medico, { foreignKey: 'medicoId', as: 'medico' });

Horario.hasMany(Cita, { foreignKey: 'horarioId', as: 'cita'});
Cita.belongsTo(Horario, { foreignKey: 'horarioId', as: 'horario'});