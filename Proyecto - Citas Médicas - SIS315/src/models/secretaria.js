import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const Secretaria = sequelize.define ('secretaria', {
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
    antiguedad: {
        type: DataTypes.INTEGER,
        default: 1,
        allowNull: false
    },
    fechaContrato: {
        type: DataTypes.DATE,
        default: new Date(),
        allowNull: false
    },
    experiencia: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        default: "activo",
        allowNull: false
    }
}, {
    timestamps: false
});