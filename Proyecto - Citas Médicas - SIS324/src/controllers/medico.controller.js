import * as medicoService from '../services/medico.service.js';

export const createMedico = async (req, res) => {
    try {
        const medico = await medicoService.createMedico(req.body);
        res.status(201).json(medico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMedicoById = async (req, res) => {
    try {
        const medico = await medicoService.getMedicoById(req.params.id);
        if (medico) {
            res.status(200).json(medico);
        } else {
            res.status(404).json({ message: 'Medico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMedico = async (req, res) => {
    try {
        const medico = await medicoService.updateMedico(req.params.id, req.body);
        if (medico[0] > 0) {
            res.status(200).json({ message: 'Medico actualizado' });
        } else {
            res.status(404).json({ message: 'Medico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteMedico = async (req, res) => {
    try {
        const success = await medicoService.deleteMedico(req.params.id);
        if (success) {
            res.status(200).json({ message: 'Medico eliminado' });
        } else {
            res.status(404).json({ message: 'Medico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMedicos = async (req, res) => {
    try {
        const medicos = await medicoService.getMedicos();
        res.status(200).json(medicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMedicosByEspecialidad = async (req, res) => {
    try {
        const medicos = await medicoService.getMedicosByEspecialidad(req.params.especialidad);
        res.status(200).json(medicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
