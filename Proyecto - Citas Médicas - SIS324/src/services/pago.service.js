import { Pago } from '../models/pago.js';
import { Op } from 'sequelize';

export const createPago = async (data) => {
    try {
        const pago = await Pago.create(data);
        return pago;
    } catch (error) {
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
    try {
        const pago = await Pago.update(data, { where: { id } });
        return pago;
    } catch (error) {
        throw error;
    }
};

export const deletePago = async (id) => {
    try {
        await Pago.destroy({ where: { id } });
        return true;
    } catch (error) {
        throw error;
    }
};

export const getPagosByPacienteIdAndPeriodo = async (pacienteId, startDate, endDate) => {
    try {
        const pagos = await Pago.findAll({
            where: {
                pacienteId,
                fecha: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        return pagos;
    } catch (error) {
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
