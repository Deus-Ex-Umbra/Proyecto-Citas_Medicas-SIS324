import express from 'express';
import * as secretariaController from '../controllers/secretaria.controller.js';

const router = express.Router();

router.post('/', secretariaController.createSecretaria);
router.get('/:id', secretariaController.getSecretariaById);
router.put('/:id', secretariaController.updateSecretaria);
router.delete('/:id', secretariaController.deleteSecretaria);
router.get('/', secretariaController.getSecretarias);

export default router;
