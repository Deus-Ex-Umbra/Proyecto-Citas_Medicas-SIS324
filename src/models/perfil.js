import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Perfil = sequelize.define('perfil', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    contraseña: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE
    },
    genero: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    CI: {
        type: DataTypes.STRING,
        default: "",
        allowNull: false
    },
    tipo_perfil: {
        type: DataTypes.STRING,
        default: "paciente",
        allowNull: false
    }
}, {
    timestamps: false
});