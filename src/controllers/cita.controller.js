import * as citaService from '../services/cita.service.js';

export const createCita = async (req, res) => {
    try {
        const { cita, pago } = await citaService.createCita(req.body);
        res.status(201).json({ cita, pago });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCitaById = async (req, res) => {
    try {
        const cita = await citaService.getCitaById(req.params.id);
        if (!cita) {
            res.status(404).json({ message: 'Cita no encontrada' });
        } else {
            res.status(200).json(cita);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCita = async (req, res) => {
    try {
        const cita = await citaService.updateCita(req.params.id, req.body);
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCita = async (req, res) => {
    try {
        await citaService.deleteCita(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCitasByPacienteId = async (req, res) => {
    try {
        const citas = await citaService.getCitasByPacienteId(req.params.pacienteId);
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCitasPendientesByPacienteId = async (req, res) => {
    try {
        const citas = await citaService.getCitasPendientesByPacienteId(req.params.pacienteId);
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCitasByMedicoId = async (req, res) => {
    try {
        const citas = await citaService.getCitasByMedicoId(req.params.medicoId);
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCitasPendientesByMedicoIdFecha = async (req, res) => {
    try {
        const citas = await citaService.getCitasPendientesByMedicoIdFecha(req.params.medicoId, req.params.fecha);
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCitasByFecha = async (req, res) => {
    try {
        const citas = await citaService.getCitasByFecha(req.params.fecha);
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCitas = async (req, res) => {
    try {
        const citas = await citaService.getAllCitas();
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
