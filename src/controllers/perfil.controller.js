import * as perfilService from '../services/perfil.service.js';

export const createPerfil = async (req, res) => {
    try {
        const perfil = await perfilService.createPerfil(req.body);
        res.status(201).json(perfil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPerfilById = async (req, res) => {
    try {
        const perfil = await perfilService.getPerfilById(req.params.id);
        if (perfil) {
            res.status(200).json(perfil);
        } else {
            res.status(404).json({ message: 'Perfil no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePerfil = async (req, res) => {
    try {
        const perfil = await perfilService.updatePerfil(req.params.id, req.body);
        if (perfil[0] > 0) {
            res.status(200).json({ message: 'Perfil actualizado' });
        } else {
            res.status(404).json({ message: 'Perfil no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePerfil = async (req, res) => {
    try {
        const success = await perfilService.deletePerfil(req.params.id);
        if (success) {
            res.status(200).json({ message: 'Perfil eliminado' });
        } else {
            res.status(404).json({ message: 'Perfil no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const token = await perfilService.login(email, contraseña);
        res.json(token);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const result = await perfilService.logout();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllPerfiles = async (req, res) => {
    try {
      const perfiles = await perfilService.getAllPerfiles();
      res.json(perfiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
