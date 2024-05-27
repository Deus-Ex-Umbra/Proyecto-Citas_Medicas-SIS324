import express from 'express';
import * as perfilController from '../controllers/perfil.controller.js';

const router = express.Router();

router.post('/', perfilController.createPerfil);
router.get('/:id', perfilController.getPerfilById);
router.put('/:id', perfilController.updatePerfil);
router.delete('/:id', perfilController.deletePerfil);
router.post('/login', perfilController.login);
router.post('/logout', perfilController.logout);
router.get('/', perfilController.getAllPerfiles);

export default router;
