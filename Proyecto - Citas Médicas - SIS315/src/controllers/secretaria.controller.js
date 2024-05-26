import * as secretariaService from '../services/secretaria.service.js';

export const createSecretaria = async (req, res) => {
    try {
        const secretaria = await secretariaService.createSecretaria(req.body);
        res.status(201).json(secretaria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSecretariaById = async (req, res) => {
    try {
        const secretaria = await secretariaService.getSecretariaById(req.params.id);
        if (secretaria) {
            res.status(200).json(secretaria);
        } else {
            res.status(404).json({ message: 'Secretaria no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSecretaria = async (req, res) => {
    try {
        const secretaria = await secretariaService.updateSecretaria(req.params.id, req.body);
        if (secretaria[0] > 0) {
            res.status(200).json({ message: 'Secretaria actualizada' });
        } else {
            res.status(404).json({ message: 'Secretaria no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSecretaria = async (req, res) => {
    try {
        const success = await secretariaService.deleteSecretaria(req.params.id);
        if (success) {
            res.status(200).json({ message: 'Secretaria eliminada' });
        } else {
            res.status(404).json({ message: 'Secretaria no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSecretarias = async (req, res) => {
    try {
        const secretarias = await secretariaService.getSecretarias();
        res.status(200).json(secretarias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
