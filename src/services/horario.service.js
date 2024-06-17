import { Horario } from '../models/horario.js';

export const createHorario = async (data) => {
    try {
        const horario = await Horario.create(data);
        return horario;
    } catch (error) {
        throw error;
    }
};

export const getHorarioById = async (id) => {
    try {
        const horario = await Horario.findByPk(id);
        return horario;
    } catch (error) {
        throw error;
    }
};

export const updateHorario = async (id, data) => {
    try {
        const horario = await Horario.update(data, { where: { id } });
        return horario;
    } catch (error) {
        throw error;
    }
};

export const deleteHorario = async (id) => {
    try {
        await Horario.destroy({ where: { id } });
        return true;
    } catch (error) {
        throw error;
    }
};

export const getHorarios = async () => {
    try {
        const horario = await Horario.findAll();
        return horario;
    } catch (error) {
        throw error;
    }
};

export const getHorariosByMedicoId = async (medicoId) => {
    try {
        const horario = await Horario.findAll({ where: { medicoId } });
        return horario;
    } catch (error) {
        throw error;
    }
};
