import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from 'express';
import { NON_EXISTING_ID } from '../constants';
import { AuthenticatedRequest, systemError, employee } from '../entities';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.service';
import { UserService } from '../services/user.service';

const errorService: ErrorService = new ErrorService();
const userService: UserService = new UserService(errorService);

const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            userService.getEmployeeById(numericParamOrError)
            .then((result: employee) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
        }
        else
        {
            // TODO: Error handling
        }
    }
    else
    {
        return ResponseHelper.handleError(res, numericParamOrError);
    }    
};

const getEmployeeByIdStoredProcedure = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number")
    {
        if (numericParamOrError > 0) {
            userService.getEmployeeByIdStoredProcedure(numericParamOrError)
            .then((result: employee) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
        }
        else
        {
            // TODO: Error handling
        }
    }
    else
    {
        return ResponseHelper.handleError(res, numericParamOrError);
    }    
};

const getEmployeesByStoreId = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number")
    {
        if (numericParamOrError > 0) {
            userService.getEmployeesByStoreId(numericParamOrError)
            .then((result: employee[]) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
        }
        else
        {
            // TODO: Error handling
        }
    }
    else
    {
        return ResponseHelper.handleError(res, numericParamOrError);
    }    
};

const updateEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: employee = req.body;

                userService.updateEmployeeById({
                    id: numericParamOrError,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    birthdate: body.birthdate,
                    is_male: body.is_male,
                    phone: body.phone,
                    store_id: body.store_id,
                    position_id: body.position_id,
                    login: body.login,
                    role_id: body.role_id
                }, (req as AuthenticatedRequest).userData.userId)
                .then((result: employee) => {
                    return res.status(200).json(result);     
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                })
            }
            else {
                // TODO: Error handling
            } 
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
};

const addEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const body: employee = req.body;
    const hashedPassword: string = bcrypt.hashSync(body.password as string);

    userService.addEmployee({
        id: NON_EXISTING_ID,
        firstName: body.firstName,
        lastName: body.lastName,
        birthdate: body.birthdate,
        is_male: body.is_male,
        phone: body.phone,
        store_id: body.store_id,
        position_id: body.position_id,
        login: body.login,
        password: hashedPassword,
        role_id: body.role_id
    }, (req as AuthenticatedRequest).userData.userId)
        .then((result: employee) => {
            return res.status(200).json(result);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

const deleteEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                userService.deleteEmployeeById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
                .then(() => {
                    return res.sendStatus(200);     
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                })
            }
            else {
                // TODO: Error handling
            } 
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
};

export default { getEmployeeById, getEmployeeByIdStoredProcedure, getEmployeesByStoreId, updateEmployeeById, addEmployee, deleteEmployeeById };