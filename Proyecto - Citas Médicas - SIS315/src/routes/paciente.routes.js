import express from 'express';
import * as pacienteController from '../controllers/paciente.controller.js';

const router = express.Router();

router.post('/', pacienteController.createPaciente);
router.get('/:id', pacienteController.getPacienteById);
router.put('/:id', pacienteController.updatePaciente);
router.delete('/:id', pacienteController.deletePaciente);
router.get('/', pacienteController.getPacientes);

export default router;
