import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const Horario = sequelize.define('horario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    turno: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        default: "disponible",
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        default: new Date(),
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        default: "00:00:00",
        allowNull: false
    }
}, {
    timestamps: false
});