import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const ItemCita = sequelize.define('itemCita', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        default: "pendiente",
        allowNull: false
    },
    tipoConsulta: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    formaPago: {
        type: DataTypes.STRING,
        default: "efectivo",
        allowNull: false
    },
    observacion: {
        type: DataTypes.STRING,
        default: "Sin Observaciones",
        allowNull: false
    },
    prioridad: {
        type: DataTypes.STRING,
        default: "normal",
        allowNull: false
    },
    duracion: {
        type: DataTypes.INTEGER,
        default: 30,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING,
        default: "consultorio",
        allowNull: false
    }
}, {
    timestamps: false
});
