import { Secretaria } from '../models/secretaria.js';
import { Perfil } from '../models/perfil.js';

export const createSecretaria = async (data) => {
    try {
        const secretaria = await Secretaria.create(data);
        return { secretaria };
    } catch (error) {
        throw error;
    }
};

export const getSecretariaById = async (id) => {
    try {
        const secretaria = await Secretaria.findByPk(id);
        return secretaria;
    } catch (error) {
        throw error;
    }
};

export const updateSecretaria = async (id, data) => {
    try {
        const secretaria = await Secretaria.findByPk(id);
        if (!secretaria) {
            throw new Error('Secretaria no encontrada');
        }
        await Secretaria.update(data, { where: { id } });
        return secretaria;
    } catch (error) {
        throw error;
    }
};

export const deleteSecretaria = async (id) => {
    try {
        const secretaria = await Secretaria.findByPk(id);
        if (!secretaria) {
            throw new Error('Secretaria no encontrada');
        }
        await Perfil.destroy({ where: { id: secretaria.perfilId } });
        return true;
    } catch (error) {
        throw error;
    }
};

export const getSecretarias = async () => {
    try {
        const secretarias = await Secretaria.findAll();
        return secretarias;
    } catch (error) {
        throw error;
    }
};
