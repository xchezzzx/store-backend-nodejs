import express from 'express';
import controller from '../controllers/store.controller';
import { Role } from '../enums';
import middleware from '../middleware/authentication.middleware';

const router = express.Router();

router.get('/all', middleware.verifyToken([Role.Administrator, Role.Operator, Role.RegularUser]), controller.getStores);
router.get('/:id', middleware.verifyToken([Role.Administrator, Role.Operator, Role.RegularUser]), controller.getStoreById);
router.put('/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.updateStoreById);
router.post('/', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.addStore);
router.delete('/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.deleteStoreById);
// ====== you are here ======

export default { router };