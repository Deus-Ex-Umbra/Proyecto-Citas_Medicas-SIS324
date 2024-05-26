import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const Cita = sequelize.define('cita', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    medico: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    paciente: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    fechaHora: {
        type: DataTypes.DATE,
        default: new Date(),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        default: "pendiente",
        allowNull: false
    },
    costo: {
        type: DataTypes.DOUBLE,
        default: 0.0,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    }
}, {
    timestamps: false
});