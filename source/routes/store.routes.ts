import express from 'express';
import controller from '../controllers/store.controller';
import { Role } from '../enums';
import middleware from '../middleware/authentication.middleware';

const router = express.Router();

router.get('/stores', middleware.verifyToken([Role.Administrator, Role.Operator, Role.RegularUser]), controller.getStores);
router.get('/store/:id', middleware.verifyToken([Role.Administrator, Role.Operator, Role.RegularUser]), controller.getStoreById);
router.put('/store/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.updateStoreById);
router.post('/store', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.addStore);
router.delete('/store/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.deleteStoreById);

export default { router };