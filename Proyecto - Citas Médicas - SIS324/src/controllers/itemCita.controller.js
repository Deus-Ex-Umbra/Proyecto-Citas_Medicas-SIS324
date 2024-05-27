import * as itemCitaService from '../services/itemCita.service.js';

export const createItemCita = async (req, res) => {
    try {
        const itemCita = await itemCitaService.createItemCita(req.body);
        res.status(201).json(itemCita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemCitaById = async (req, res) => {
    try {
        const itemCita = await itemCitaService.getItemCitaById(req.params.id);
        if (itemCita) {
            res.status(200).json(itemCita);
        } else {
            res.status(404).json({ message: 'Item de Cita no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateItemCita = async (req, res) => {
    try {
        const itemCita = await itemCitaService.updateItemCita(req.params.id, req.body);
        if (itemCita[0] > 0) {
            res.status(200).json({ message: 'Item de Cita actualizado' });
        } else {
            res.status(404).json({ message: 'Item de Cita no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteItemCita = async (req, res) => {
    try {
        const success = await itemCitaService.deleteItemCita(req.params.id);
        if (success) {
            res.status(200).json({ message: 'Item de Cita eliminado' });
        } else {
            res.status(404).json({ message: 'Item de Cita no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemsCitaByCitaId = async (req, res) => {
    try {
        const itemsCita = await itemCitaService.getItemsCitaByCitaId(req.params.citaId);
        res.status(200).json(itemsCita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllItemCita = async (req, res) => {
    try {
        const itemsCita = await itemCitaService.getAllItemCita();
        res.status(200).json(itemsCita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};