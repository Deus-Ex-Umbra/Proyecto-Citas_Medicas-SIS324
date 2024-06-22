import express from 'express';
import * as pagoController from '../controllers/pago.controller.js';

const router = express.Router();

router.post('/', pagoController.createPago);
router.get('/:id', pagoController.getPagoById);
router.put('/:id', pagoController.updatePago);
router.delete('/:id', pagoController.deletePago);
router.get('/', pagoController.getAllPagos);
router.get('/paciente/:pacienteId', pagoController.getPagosByPacienteAndDateRange);

export default router;
