import { ItemCita } from '../models/itemCita.js';

export const createItemCita = async (data) => {
    try {
        const itemCita = await ItemCita.create(data);
        return itemCita;
    } catch (error) {
        throw error;
    }
};

export const getItemCitaById = async (id) => {
    try {
        const itemCita = await ItemCita.findByPk(id);
        return itemCita;
    } catch (error) {
        throw error;
    }
};

export const updateItemCita = async (id, data) => {
    try {
        const itemCita = await ItemCita.update(data, { where: { id } });
        return itemCita;
    } catch (error) {
        throw error;
    }
};

export const deleteItemCita = async (id) => {
    try {
        await ItemCita.destroy({ where: { id } });
        return true;
    } catch (error) {
        throw error;
    }
};

export const getItemsCitaByCitaId = async (citaId) => {
    try {
        const itemsCita = await ItemCita.findAll({ where: { citaId } });
        return itemsCita;
    } catch (error) {
        throw error;
    }
};

export const getAllItemCita = async () => {
    try {
        const itemsCita = await ItemCita.findAll();
        return itemsCita;
    } catch (error) {
        throw error;
    }
};