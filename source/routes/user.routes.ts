import express from 'express';
import controller from '../controllers/user.controller';
import { Role } from '../enums';
import middleware from '../middleware/authentication.middleware';

const router = express.Router();

router.get('/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.getEmployeeById);
router.get('/sp/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.getEmployeeByIdStoredProcedure);
router.get('/by-store/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.getEmployeesByStoreId);
router.put('/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.updateEmployeeById);
router.post('/add/', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.addEmployee);
 router.delete('/:id', middleware.verifyToken([Role.Administrator]), controller.deleteEmployeeById);
// ====== you are here ======
// router.delete('/manager/:id', middleware.verifyToken([Role.Administrator]), controller.deleteByManagerId);
// router.get('/positions', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.getPositions);

export default { router };

// Create designated service to serve employees CRUD:
//  Get a list of all employees by store id
//  Get an employee by id
//  Update employee info by id (including position)
//  Create new employee and reference the employee to a store(s) (including position)
//  Delete an employee by id
//  Add employee relation by id of a manager and id of subordinate
//  Delete employees relation by manager id and subordinate id
//  Get all employees positions
