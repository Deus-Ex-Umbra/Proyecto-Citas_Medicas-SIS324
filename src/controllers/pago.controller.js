import * as pagoService from '../services/pago.service.js';

export const createPago = async (req, res) => {
    try {
        const pago = await pagoService.createPago(req.body);
        res.status(201).json(pago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPagoById = async (req, res) => {
    try {
        const pago = await pagoService.getPagoById(req.params.id);
        if (!pago) {
            res.status(404).json({ message: 'Pago no encontrado' });
        } else {
            res.status(200).json(pago);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePago = async (req, res) => {
    try {
        const pago = await pagoService.updatePago(req.params.id, req.body);
        res.status(200).json(pago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePago = async (req, res) => {
    try {
        await pagoService.deletePago(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllPagos = async (req, res) => {
    try {
        const pagos = await pagoService.getAllPagos();
        res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPagosByPacienteInPeriodController = async (req, res) => {
    const { pacienteId, fechaInicio, fechaFin } = req.query;
    console.log(`Controlador - pacienteId: ${pacienteId}, fechaInicio: ${fechaInicio}, fechaFin: ${fechaFin}`); // Añade este log
    try {
        const pagos = await getPagosByPacienteInPeriod(pacienteId, fechaInicio, fechaFin);
        res.status(200).json(pagos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};