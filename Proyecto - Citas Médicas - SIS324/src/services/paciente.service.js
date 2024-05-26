import { Paciente } from '../models/paciente.js';

export const createPaciente = async (data) => {
    try {
        const paciente = await Paciente.create(data);
        return paciente;
    } catch (error) {
        throw error;
    }
};

export const getPacienteById = async (id) => {
    try {
        const paciente = await Paciente.findByPk(id);
        return paciente;
    } catch (error) {
        throw error;
    }
};

export const updatePaciente = async (id, data) => {
    try {
        const paciente = await Paciente.update(data, { where: { id } });
        return paciente;
    } catch (error) {
        throw error;
    }
};

export const deletePaciente = async (id) => {
    try {
        await Paciente.destroy({ where: { id } });
        return true;
    } catch (error) {
        throw error;
    }
};

export const getPacientes = async () => {
    try {
        const pacientes = await Paciente.findAll();
        return pacientes;
    } catch (error) {
        throw error;
    }
};
