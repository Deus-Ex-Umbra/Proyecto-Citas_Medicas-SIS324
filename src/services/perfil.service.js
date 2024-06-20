import { Perfil } from '../models/perfil.js';
import * as Paciente from '../services/paciente.service.js';
import * as Secretaria from '../services/secretaria.service.js';
import * as Medico from '../services/medico.service.js';

export const createPerfil = async (data) => {
    try {
        const perfil = await Perfil.create(data);
        if (data.tipo_perfil === 'paciente') {
            await Paciente.createPaciente({ perfilId: perfil.id });
        } else if (data.tipo_perfil === 'secretaria') {
            await Secretaria.createSecretaria({ perfilId: perfil.id });
        } else if (data.tipo_perfil === 'medico') {
            await Medico.createMedico({ perfilId: perfil.id });
        }
        return perfil;
    } catch (error) {
        throw error;
    }
};

export const getPerfilById = async (id) => {
    try {
        const perfil = await Perfil.findByPk(id);
        return perfil;
    } catch (error) {
        throw error;
    }
};

export const updatePerfil = async (id, data) => {
    try {
        const perfil = await Perfil.update(data, { where: { id } });
        return perfil;
    } catch (error) {
        throw error;
    }
};

export const deletePerfil = async (id) => {
    try {
        await Perfil.destroy({ where: { id } });
        return true;
    } catch (error) {
        throw error;
    }
};

export const getAllPerfiles = async () => {
    try {
        const perfiles = await Perfil.findAll();
        return perfiles;
    } catch (error) {
        throw error;
    }
};

export const login = async (email, contraseña) => {
    try {
        const perfil = await Perfil.findOne({ where: { email, contraseña } });
        if (!perfil) throw new Error('Credenciales incorrectas');
        return { message: 'Inicio de sesión exitoso' };
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        return { message: 'Sesión cerrada correctamente' };
    } catch (error) {
        throw error;
    }
};
