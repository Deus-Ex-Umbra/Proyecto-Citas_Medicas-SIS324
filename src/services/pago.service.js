import { Pago } from '../models/pago.js';
import { Cita } from '../models/cita.js';
import { Paciente } from '../models/paciente.js';
import { sequelize } from '../database/database.js';

export const createPago = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        // Verificar si la cita existe
        const cita = await Cita.findByPk(data.citaId, { transaction });
        if (!cita) {
            throw new Error('La cita no existe');
        }

        // Verificar si el paciente existe
        const paciente = await Paciente.findByPk(data.pacienteId, { transaction });
        if (!paciente) {
            throw new Error('El paciente no existe');
        }

        // Crear el pago
        const pago = await Pago.create(data, { transaction });

        await transaction.commit();
        return pago;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getPagoById = async (id) => {
    try {
        const pago = await Pago.findByPk(id);
        return pago;
    } catch (error) {
        throw error;
    }
};

export const updatePago = async (id, data) => {
    const transaction = await sequelize.transaction();
    try {
        const pago = await Pago.findByPk(id, { transaction });
        if (!pago) {
            throw new Error('Pago no encontrado');
        }

        await Pago.update(data, { where: { id }, transaction });

        // Actualizar la cita correspondiente
        const cita = await Cita.findByPk(pago.citaId, { transaction });
        if (cita) {
            await Cita.update({
                costo: data.monto,
                fechaHora: data.fecha,
                formaPago: data.metodoPago,
                descripcion: data.descripcion
            }, { where: { id: cita.id }, transaction });
        }

        await transaction.commit();
        return pago;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const deletePago = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const pago = await Pago.findByPk(id, { transaction });
        if (!pago) {
            throw new Error('Pago no encontrado');
        }

        // Eliminar el pago
        await Pago.destroy({ where: { id }, transaction });

        // Actualizar la cita correspondiente
        const cita = await Cita.findByPk(pago.citaId, { transaction });
        if (cita) {
            await Cita.update({
                estado: 'cancelada'
            }, { where: { id: cita.id }, transaction });
        }

        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getAllPagos = async () => {
    try {
        const pagos = await Pago.findAll();
        return pagos;
    } catch (error) {
        throw error;
    }
};
