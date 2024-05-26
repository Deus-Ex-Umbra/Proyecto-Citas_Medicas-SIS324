import * as pacienteService from '../services/paciente.service.js';

export const createPaciente = async (req, res) => {
    try {
        const paciente = await pacienteService.createPaciente(req.body);
        res.status(201).json(paciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPacienteById = async (req, res) => {
    try {
        const paciente = await pacienteService.getPacienteById(req.params.id);
        if (paciente) {
            res.status(200).json(paciente);
        } else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePaciente = async (req, res) => {
    try {
        const paciente = await pacienteService.updatePaciente(req.params.id, req.body);
        if (paciente[0] > 0) {
            res.status(200).json({ message: 'Paciente actualizado' });
        } else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePaciente = async (req, res) => {
    try {
        const success = await pacienteService.deletePaciente(req.params.id);
        if (success) {
            res.status(200).json({ message: 'Paciente eliminado' });
        } else {
            res.status(404).json({ message: 'Paciente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPacientes = async (req, res) => {
    try {
        const pacientes = await pacienteService.getPacientes();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
