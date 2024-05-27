import { Perfil } from '../models/perfil.js';

export const createPerfil = async (data) => {
    try {
        const perfil = await Perfil.create(data);
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

        // Aquí podrías implementar la generación de un token de sesión
        // Por simplicidad, en este ejemplo, solo devuelvo un mensaje
        return { message: 'Inicio de sesión exitoso' };
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        // Aquí podrías implementar la lógica de cierre de sesión
        // Por simplicidad, en este ejemplo, solo devuelvo un mensaje
        return { message: 'Sesión cerrada correctamente' };
    } catch (error) {
        throw error;
    }
};
