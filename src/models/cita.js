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
        defaultValue: new Date()
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "pendiente"
    },
    costo: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    descripcion: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    tipoConsulta: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    formaPago: {
        type: DataTypes.STRING,
        defaultValue: "efectivo"
    },
    observacion: {
        type: DataTypes.STRING,
        defaultValue: "Sin Observaciones"
    },
    prioridad: {
        type: DataTypes.STRING,
        defaultValue: "normal"
    },
    duracion: {
        type: DataTypes.INTEGER,
        defaultValue: 30
    },
    ubicacion: {
        type: DataTypes.STRING,
        defaultValue: "consultorio"
    },
    pacienteId: {
        type: DataTypes.INTEGER,
        references: {
            model: Paciente,
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    secretariaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Secretaria,
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
    },
    horarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Horario,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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