import express from 'express';
import * as itemCitaController from '../controllers/itemCita.controller.js';

const router = express.Router();

router.post('/', itemCitaController.createItemCita);
router.get('/:id', itemCitaController.getItemCitaById);
router.put('/:id', itemCitaController.updateItemCita);
router.delete('/:id', itemCitaController.deleteItemCita);
router.get('/cita/:citaId', itemCitaController.getItemsCitaByCitaId);
router.get('/', itemCitaController.getAllItemCita);

export default router;
