import { Medico } from '../models/medico.js';
import { Perfil } from '../models/perfil.js';

export const createMedico = async (data) => {
    try {
        const perfilData = {
            nombre: data.nombre,
            email: data.email,
            rol: 'medico'
        };
        const perfil = await Perfil.create(perfilData);
        const medicoData = {
            ...data,
            perfilId: perfil.id
        };
        const medico = await Medico.create(medicoData);
        return { perfil, medico };
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
        const medico = await Medico.findByPk(id);
        if (!medico) {
            throw new Error('Medico no encontrado');
        }
        await Medico.update(data, { where: { id } });
        await Perfil.update({ nombre: data.nombre, email: data.email }, { where: { id: medico.perfilId } });
        return medico;
    } catch (error) {
        throw error;
    }
};

export const deleteMedico = async (id) => {
    try {
        const medico = await Medico.findByPk(id);
        if (!medico) {
            throw new Error('Medico no encontrado');
        }
        await Perfil.destroy({ where: { id: medico.perfilId } });
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
