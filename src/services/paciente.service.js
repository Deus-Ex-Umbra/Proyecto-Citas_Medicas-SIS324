import { Paciente } from '../models/paciente.js';
import { Perfil } from '../models/perfil.js';

export const createPaciente = async (data) => {
    try {
        const perfilData = {
            nombre: data.nombre,
            email: data.email,
            rol: 'paciente'
        };
        const perfil = await Perfil.create(perfilData);
        const pacienteData = {
            ...data,
            perfilId: perfil.id
        };
        const paciente = await Paciente.create(pacienteData);
        return { perfil, paciente };
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
        const paciente = await Paciente.findByPk(id);
        if (!paciente) {
            throw new Error('Paciente no encontrado');
        }
        await Paciente.update(data, { where: { id } });
        await Perfil.update({ nombre: data.nombre, email: data.email }, { where: { id: paciente.perfilId } });
        return paciente;
    } catch (error) {
        throw error;
    }
};

export const deletePaciente = async (id) => {
    try {
        const paciente = await Paciente.findByPk(id);
        if (!paciente) {
            throw new Error('Paciente no encontrado');
        }
        await Perfil.destroy({ where: { id: paciente.perfilId } });
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
