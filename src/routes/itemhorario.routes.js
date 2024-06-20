import express from 'express';
import * as itemHorarioController from '../controllers/itemhorario.controller.js';

const router = express.Router();

router.post('/', itemHorarioController.createItemHorario);
router.get('/', itemHorarioController.getItemHorarios);
router.get('/:id', itemHorarioController.getItemHorarioById);
router.put('/:id', itemHorarioController.updateItemHorario);
router.delete('/:id', itemHorarioController.deleteItemHorario);
router.get('/buscarDisponible', itemHorarioController.getItemHorarioByMedicoDiaHora);
router.get('/buscarPorDia', itemHorarioController.getItemHorariosByDia);
router.get('/buscarPorHora', itemHorarioController.getItemHorariosByHora);
router.get('/buscarPorEstado', itemHorarioController.getItemHorariosByEstado);

export default router;
