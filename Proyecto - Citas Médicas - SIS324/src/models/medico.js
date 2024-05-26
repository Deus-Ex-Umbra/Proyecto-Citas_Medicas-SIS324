import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const Medico = sequelize.define('medico', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    cv: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    antiguedad: {
        type: DataTypes.INTEGER,
        default: 1,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        default: "activo",
        allowNull: false
    },
    turno: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    }
}, {
    timestamps: false
});