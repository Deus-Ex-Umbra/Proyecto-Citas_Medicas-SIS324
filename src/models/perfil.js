import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Perfil = sequelize.define('perfil', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        default: ""
    },
    apellido: {
        type: DataTypes.STRING,
        default: ""
    },
    email: {
        type: DataTypes.STRING,
        default: ""
    },
    telefono: {
        type: DataTypes.STRING,
        default: ""
    },
    contraseña: {
        type: DataTypes.STRING,
        default: ""
    },
    foto: {
        type: DataTypes.STRING,
        default: ""
    },
    direccion: {
        type: DataTypes.STRING,
        default: ""
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        default: new Date()
    },
    genero: {
        type: DataTypes.STRING,
        default: ""
    },
    CI: {
        type: DataTypes.STRING,
        default: ""
    },
    tipo_perfil: {
        type: DataTypes.STRING,
        default: "paciente"
    }
}, {
    timestamps: false
});