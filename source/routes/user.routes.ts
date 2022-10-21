import express from 'express';
import controller from '../controllers/user.controller';
import { Role } from '../enums';
import middleware from '../middleware/authentication.middleware';

const router = express.Router();

router.get('/employyes', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.getEmployees);
router.get('/employee/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.getEmployeeById);
router.post('/', middleware.verifyToken([Role.Administrator]), controller.add);
router.put('/:id', middleware.verifyToken([Role.Administrator]), controller.updateById);
router.delete('/:id', middleware.verifyToken([Role.Administrator]), controller.deleteById);
router.delete('/:id', middleware.verifyToken([Role.Administrator]), controller.deleteByManagerId);

export default { router };

// Create designated service to serve employees CRUD:
// Get a list of all employees by store id
// Get an employee by id
// Update employee info by id (including position)
// Create new employee and reference the employee to a store(s) (including position)
// Delete an employee by id
// Add employee relation by id of a manager and id of subordinate
// Delete employees relation by manager id and subordinate id
// Get all employees positions
