import { Perfil } from '../models/perfil.js';

export const createPerfil = async (data) => {
    try {
        const perfil = await Perfil.create(data);
        if (data.rol === 'paciente') {
            await Paciente.create({ perfilId: perfil.id });
        } else if (data.rol === 'secretaria') {
            await Secretaria.create({ perfilId: perfil.id });
        } else if (data.rol === 'medico') {
            await Medico.create({ perfilId: perfil.id });
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
