import * as horarioService from '../services/horario.service.js';

export const createHorario = async (req, res) => {
    try {
        const horario = await horarioService.createHorario(req.body);
        res.status(201).json(horario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHorarioById = async (req, res) => {
    try {
        const horario = await horarioService.getHorarioById(req.params.id);
        if (horario) {
            res.status(200).json(horario);
        } else {
            res.status(404).json({ message: 'Horario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateHorario = async (req, res) => {
    try {
        const horario = await horarioService.updateHorario(req.params.id, req.body);
        if (horario[0] > 0) {
            res.status(200).json({ message: 'Horario actualizado' });
        } else {
            res.status(404).json({ message: 'Horario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteHorario = async (req, res) => {
    try {
        const success = await horarioService.deleteHorario(req.params.id);
        if (success) {
            res.status(200).json({ message: 'Horario eliminado' });
        } else {
            res.status(404).json({ message: 'Horario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHorarios = async (req, res) => {
    try {
        const horario = await horarioService.getHorarios();
        res.status(200).json(horario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHorariosByMedicoId = async (req, res) => {
    try {
        const horario = await horarioService.getHorariosByMedicoId(req.params.medicoId);
        res.status(200).json(horario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHorariosByDia = async (req, res) => {
    try {
        const horarios = await horarioService.getHorariosByDia(req.query.dia);
        res.status(200).json(horarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHorariosByTurno = async (req, res) => {
    try {
        const horarios = await horarioService.getHorariosByTurno(req.query.turno);
        res.status(200).json(horarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHorariosByMedicoIdAndDia = async (req, res) => {
    try {
        const horarios = await horarioService.getHorariosByMedicoIdAndDia(req.params.medicoId, req.query.dia);
        res.status(200).json(horarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHorariosByMedicoIdAndTurno = async (req, res) => {
    try {
        const horarios = await horarioService.getHorariosByMedicoIdAndTurno(req.params.medicoId, req.query.turno);
        res.status(200).json(horarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

