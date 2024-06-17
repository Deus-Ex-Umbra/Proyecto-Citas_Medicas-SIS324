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
        if (pago) {
            res.status(200).json(pago);
        } else {
            res.status(404).json({ message: 'Pago no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePago = async (req, res) => {
    try {
        const pago = await pagoService.updatePago(req.params.id, req.body);
        if (pago[0] > 0) {
            res.status(200).json({ message: 'Pago actualizado' });
        } else {
            res.status(404).json({ message: 'Pago no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePago = async (req, res) => {
    try {
        const success = await pagoService.deletePago(req.params.id);
        if (success) {
            res.status(200).json({ message: 'Pago eliminado' });
        } else {
            res.status(404).json({ message: 'Pago no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
