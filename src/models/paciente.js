import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Perfil } from '../models/perfil.js';

export const Paciente = sequelize.define('paciente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    historial_citas: {
        type: DataTypes.STRING,
        default: ""
    },
    tipo_sangre: {
        type: DataTypes.STRING,
        default: "ORH(+)"
    },
    seguridad_social: {
        type: DataTypes.STRING,
        default: ""
    },
    estado_fisico: {
        type: DataTypes.STRING,
        default: ""
    },
    enfermedad_de_base: {
        type: DataTypes.STRING,
        default: ""
    },
    cirugias: {
        type: DataTypes.STRING,
        default: ""
    },
    medicamentos: {
        type: DataTypes.STRING,
        default: ""
    },
    alergias: {
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

Perfil.hasMany(Paciente, { foreignKey: 'perfilId' });
Paciente.belongsTo(Perfil, { foreignKey: 'perfilId' });