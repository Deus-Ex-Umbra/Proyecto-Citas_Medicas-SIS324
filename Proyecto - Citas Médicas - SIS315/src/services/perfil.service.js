import { Perfil } from '../models/perfil.js';
import bcrypt from 'bcrypt';

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

export const login = async (email, password) => {
    try {
        const perfil = await Perfil.findOne({ where: { email } });
        if (!perfil) throw new Error('Usuario no encontrado');

        const isValid = await bcrypt.compare(password, perfil.password);
        if (!isValid) throw new Error('Contraseña incorrecta');

        return perfil;
    } catch (error) {
        throw error;
    }
};

export const logout = async (userId) => {
    // Implementación de cierre de sesión (esto puede variar según la estrategia de sesión utilizada)
    return true;
};

export const changePassword = async (id, oldPassword, newPassword) => {
    try {
        const perfil = await Perfil.findByPk(id);
        if (!perfil) throw new Error('Usuario no encontrado');

        const isValid = await bcrypt.compare(oldPassword, perfil.password);
        if (!isValid) throw new Error('Contraseña incorrecta');

        perfil.password = await bcrypt.hash(newPassword, 10);
        await perfil.save();

        return perfil;
    } catch (error) {
        throw error;
    }
};
