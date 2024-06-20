import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Cita } from "./cita.js";
import { Paciente } from "./paciente.js";

export const Pago = sequelize.define('pago', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    monto: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    metodoPago: {
        type: DataTypes.STRING,
        defaultValue: "efectivo"
    },
    descripcion: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    citaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Cita,
            key: 'id'
        }
    },
    pacienteId: {
        type: DataTypes.INTEGER,
        references: {
            model: Paciente,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

Cita.hasMany(Pago, { foreignKey: 'citaId' });
Pago.belongsTo(Cita, { foreignKey: 'citaId' });

Paciente.hasMany(Pago, { foreignKey: 'pacienteId' });
Pago.belongsTo(Paciente, { foreignKey: 'pacienteId' });
