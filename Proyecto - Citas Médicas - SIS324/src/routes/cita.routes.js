import express from 'express';
import * as citaController from '../controllers/cita.controller.js';

const router = express.Router();

router.post('/', citaController.createCita);
router.get('/:id', citaController.getCitaById);
router.put('/:id', citaController.updateCita);
router.delete('/:id', citaController.deleteCita);
router.get('/paciente/:pacienteId', citaController.getCitasByPacienteId);
router.get('/paciente/pendientes/:pacienteId', citaController.getCitasPendientesByPacienteId);
router.get('/medico/:medicoId', citaController.getCitasByMedicoId);
router.get('/medico/:medicoId/fecha/:fecha', citaController.getCitasPendientesByMedicoIdFecha);
router.get('/fecha/:fecha', citaController.getCitasByFecha);
router.get('/', citaController.getAllCitas);

export default router;
