import express from 'express';
import * as medicoController from '../controllers/medico.controller.js';

const router = express.Router();

router.post('/', medicoController.createMedico);
router.get('/:id', medicoController.getMedicoById);
router.put('/:id', medicoController.updateMedico);
router.delete('/:id', medicoController.deleteMedico);
router.get('/', medicoController.getMedicos);
router.get('/especialidad/:especialidad', medicoController.getMedicosByEspecialidad);

export default router;
