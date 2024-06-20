import { Cita } from '../models/cita.js';
import { Pago } from '../models/pago.js';
import { ItemHorario } from '../models/itemhorario.js';
import { sequelize } from '../database/database.js';

export const createCita = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const cita = await Cita.create(data, { transaction });
        const pagoData = {
            pacienteId: data.pacienteId,
            monto: data.costo,
            fecha: data.fechaHora,
            metodoPago: data.formaPago,
            descripcion: `Pago por cita ${cita.id}`,
            citaId: cita.id
        };
        const pago = await Pago.create(pagoData, { transaction });

        // Actualizar el estado de ItemHorario a 'no disponible'
        const itemHorario = await ItemHorario.findByPk(data.itemhorarioId, { transaction });
        if (itemHorario) {
            itemHorario.estado = 'no disponible';
            await itemHorario.save({ transaction });
        }

        await transaction.commit();
        return { cita, pago };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getCitaById = async (id) => {
    try {
        const cita = await Cita.findByPk(id);
        return cita;
    } catch (error) {
        throw error;
    }
};

export const updateCita = async (id, data) => {
    const transaction = await sequelize.transaction();
    try {
        const cita = await Cita.findByPk(id, { transaction });
        if (!cita) {
            throw new Error('Cita no encontrada');
        }
        await Cita.update(data, { where: { id }, transaction });

        const pago = await Pago.findOne({ where: { citaId: id }, transaction });
        if (pago) {
            await Pago.update({
                monto: data.costo,
                fecha: data.fechaHora,
                metodoPago: data.formaPago
            }, { where: { id: pago.id }, transaction });
        }

        // Actualizar el estado del ItemHorario si ha cambiado
        if (data.itemhorarioId && data.itemhorarioId !== cita.itemhorarioId) {
            const oldItemHorario = await ItemHorario.findByPk(cita.itemhorarioId, { transaction });
            if (oldItemHorario) {
                oldItemHorario.estado = 'disponible';
                await oldItemHorario.save({ transaction });
            }

            const newItemHorario = await ItemHorario.findByPk(data.itemhorarioId, { transaction });
            if (newItemHorario) {
                newItemHorario.estado = 'no disponible';
                await newItemHorario.save({ transaction });
            }
        }

        await transaction.commit();
        return cita;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const deleteCita = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const cita = await Cita.findByPk(id, { transaction });
        if (!cita) {
            throw new Error('Cita no encontrada');
        }

        const itemHorario = await ItemHorario.findByPk(cita.itemhorarioId, { transaction });
        if (itemHorario) {
            itemHorario.estado = 'disponible';
            await itemHorario.save({ transaction });
        }

        await Pago.destroy({ where: { citaId: id }, transaction });
        await Cita.destroy({ where: { id }, transaction });

        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getCitasByPacienteId = async (pacienteId) => {
    try {
        const citas = await Cita.findAll({ where: { pacienteId } });
        return citas;
    } catch (error) {
        throw error;
    }
};

export const getCitasPendientesByPacienteId = async (pacienteId) => {
    try {
        const citas = await Cita.findAll({ where: { pacienteId, estado: 'pendiente' } });
        return citas;
    } catch (error) {
        throw error;
    }
};

export const getCitasByMedicoId = async (medicoId) => {
    try {
        const citas = await Cita.findAll({ where: { medicoId } });
        return citas;
    } catch (error) {
        throw error;
    }
};

export const getCitasPendientesByMedicoIdFecha = async (medicoId, fecha) => {
    try {
        const citas = await Cita.findAll({ where: { medicoId, fechaHora: fecha, estado: 'pendiente' } });
        return citas;
    } catch (error) {
        throw error;
    }
};

export const getCitasByFecha = async (fecha) => {
    try {
        const citas = await Cita.findAll({ where: { fechaHora: fecha } });
        return citas;
    } catch (error) {
        throw error;
    }
};

export const getAllCitas = async () => {
    try {
        const citas = await Cita.findAll();
        return citas;
    } catch (error) {
        throw error;
    }
};

