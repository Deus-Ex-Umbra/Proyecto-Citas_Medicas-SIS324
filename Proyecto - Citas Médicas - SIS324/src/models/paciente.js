import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Perfil } from '../models/perfil.js';

export const Paciente = sequelize.define('paciente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    historial_citas: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    tipo_sangre: {
        type: DataTypes.STRING,
        default: "ORH(+)",
        allowNull: false
    },
    seguridad_social: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    estado_fisico: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    enfermedad_de_base: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    cirugias: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    medicamentos: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    alergias: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    perfilId: {
        type: DataTypes.INTEGER,
        references: {
            model: Perfil,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

Perfil.hasMany(Paciente, { foreignKey: 'perfilId' });
Paciente.belongsTo(Perfil, { foreignKey: 'perfilId' });