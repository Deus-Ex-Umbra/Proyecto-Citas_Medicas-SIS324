import * as itemHorarioService from '../services/itemhorario.service.js';

export const createItemHorario = async (req, res) => {
    try {
        const itemHorario = await itemHorarioService.createItemHorario(req.body);
        res.status(201).json(itemHorario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getItemHorarios = async (req, res) => {
    try {
        const itemHorarios = await itemHorarioService.getItemHorarios();
        res.status(200).json(itemHorarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getItemHorarioById = async (req, res) => {
    try {
        const itemHorario = await itemHorarioService.getItemHorarioById(req.params.id);
        if (itemHorario) {
            res.status(200).json(itemHorario);
        } else {
            res.status(404).json({ error: "ItemHorario not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateItemHorario = async (req, res) => {
    try {
        const itemHorario = await itemHorarioService.updateItemHorario(req.params.id, req.body);
        if (itemHorario) {
            res.status(200).json(itemHorario);
        } else {
            res.status(404).json({ error: "ItemHorario not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteItemHorario = async (req, res) => {
    try {
        const deleted = await itemHorarioService.deleteItemHorario(req.params.id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: "ItemHorario not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getItemHorarioByMedicoDiaHora = async (req, res) => {
    try {
        const { medicoId, dia, hora } = req.query;
        const itemHorario = await itemHorarioService.getItemHorarioByMedicoDiaHora(medicoId, dia, hora);
        if (itemHorario) {
            res.status(200).json(itemHorario);
        } else {
            res.status(404).json({ message: 'ItemHorario not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemHorariosByDia = async (req, res) => {
    try {
        const itemHorarios = await itemHorarioService.getItemHorariosByDia(req.query.dia);
        res.status(200).json(itemHorarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemHorariosByHora = async (req, res) => {
    try {
        const itemHorarios = await itemHorarioService.getItemHorariosByHora(req.query.hora);
        res.status(200).json(itemHorarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemHorariosByEstado = async (req, res) => {
    try {
        const itemHorarios = await itemHorarioService.getItemHorariosByEstado(req.query.estado);
        res.status(200).json(itemHorarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

