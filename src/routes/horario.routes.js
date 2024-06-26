import express from 'express';
import * as horarioController from '../controllers/horario.controller.js';

const router = express.Router();

router.post('/', horarioController.createHorario);
router.get('/:id', horarioController.getHorarioById);
router.put('/:id', horarioController.updateHorario);
router.delete('/:id', horarioController.deleteHorario);
router.get('/', horarioController.getHorarios);
router.get('/medico/:medicoId', horarioController.getHorariosByMedicoId);
router.get('/buscarPorDia', horarioController.getHorariosByDia);
router.get('/buscarPorTurno', horarioController.getHorariosByTurno);
router.get('/medico/:medicoId/dia', horarioController.getHorariosByMedicoIdAndDia);
router.get('/medico/:medicoId/turno', horarioController.getHorariosByMedicoIdAndTurno);

export default router;
