import express from 'express';
import * as itemHorarioController from '../controllers/itemhorario.controller.js';

const router = express.Router();

router.post('/', itemHorarioController.createItemHorario);
router.get('/', itemHorarioController.getItemHorarios);
router.get('/:id', itemHorarioController.getItemHorarioById);
router.put('/:id', itemHorarioController.updateItemHorario);
router.delete('/:id', itemHorarioController.deleteItemHorario);

export default router;
