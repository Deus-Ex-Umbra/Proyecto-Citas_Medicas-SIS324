import { Cita } from '../models/cita.js';

export const createCita = async (data) => {
    try {
        const cita = await Cita.create(data);
        return cita;
    } catch (error) {
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
    try {
        const cita = await Cita.update(data, { where: { id } });
        return cita;
    } catch (error) {
        throw error;
    }
};

export const deleteCita = async (id) => {
    try {
        await Cita.destroy({ where: { id } });
        return true;
    } catch (error) {
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

export const getCitasByMedicoId = async (medicoId) => {
    try {
        const citas = await Cita.findAll({ where: { medicoId } });
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
