import { ItemHorario } from '../models/itemhorario.js';

export const createItemHorario = async (data) => {
    try {
        const itemHorario = await ItemHorario.create(data);
        return itemHorario;
    } catch (error) {
        throw error;
    }
};

export const getItemHorarioById = async (id) => {
    try {
        const itemHorario = await ItemHorario.findByPk(id);
        return itemHorario;
    } catch (error) {
        throw error;
    }
};

export const updateItemHorario = async (id, data) => {
    try {
        const itemHorario = await ItemHorario.update(data, { where: { id } });
        return itemHorario;
    } catch (error) {
        throw error;
    }
};

export const deleteItemHorario = async (id) => {
    try {
        await ItemHorario.destroy({ where: { id } });
        return true;
    } catch (error) {
        throw error;
    }
};

export const getItemHorarios = async () => {
    try {
        const itemHorarios = await ItemHorario.findAll();
        return itemHorarios;
    } catch (error) {
        throw error;
    }
};

export const getItemHorariosByMedicoId = async (medicoId) => {
    try {
        const itemHorarios = await ItemHorario.findAll({ where: { medicoId } });
        return itemHorarios;
    } catch (error) {
        throw error;
    }
};

export const deleteItemHorariosByHorarioId = async (horarioId) => {
    try {
        await ItemHorario.destroy({ where: { horarioId } });
        return true;
    } catch (error) {
        throw error;
    }
};

export const getItemHorarioByMedicoDiaHora = async (medicoId, dia, hora) => {
    try {
        const itemHorario = await ItemHorario.findOne({
            where: {
                medicoId,
                dia,
                hora
            }
        });
        return itemHorario;
    } catch (error) {
        throw error;
    }
};

export const getItemHorariosByDia = async (dia) => {
    try {
        const itemHorarios = await ItemHorario.findAll({ where: { dia } });
        return itemHorarios;
    } catch (error) {
        throw error;
    }
};

export const getItemHorariosByHora = async (hora) => {
    try {
        const itemHorarios = await ItemHorario.findAll({ where: { hora } });
        return itemHorarios;
    } catch (error) {
        throw error;
    }
};

export const getItemHorariosByEstado = async (estado) => {
    try {
        const itemHorarios = await ItemHorario.findAll({ where: { estado } });
        return itemHorarios;
    } catch (error) {
        throw error;
    }
};

