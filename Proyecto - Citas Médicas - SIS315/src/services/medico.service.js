import { Medico } from '../models/medico.js';

export const createMedico = async (data) => {
    try {
        const medico = await Medico.create(data);
        return medico;
    } catch (error) {
        throw error;
    }
};

export const getMedicoById = async (id) => {
    try {
        const medico = await Medico.findByPk(id);
        return medico;
    } catch (error) {
        throw error;
    }
};

export const updateMedico = async (id, data) => {
    try {
        const medico = await Medico.update(data, { where: { id } });
        return medico;
    } catch (error) {
        throw error;
    }
};

export const deleteMedico = async (id) => {
    try {
        await Medico.destroy({ where: { id } });
        return true;
    } catch (error) {
        throw error;
    }
};

export const getMedicos = async () => {
    try {
        const medicos = await Medico.findAll();
        return medicos;
    } catch (error) {
        throw error;
    }
};

export const getMedicosByEspecialidad = async (especialidad) => {
    try {
        const medicos = await Medico.findAll({ where: { especialidad } });
        return medicos;
    } catch (error) {
        throw error;
    }
};
