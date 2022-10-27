import * as _ from "underscore";
import { Queries, StoredProcedures } from "../constants";
import { entityWithId, systemError, employee } from "../entities";
import { Gender, Role, Status } from "../enums";
import { DateHelper } from "../helpers/date.helper";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface localUser
{
    id: number,
    first_name: string,
    last_name: string,
    birthdate: string,
    is_male?: number,
    gender?: string,
    phone: string,
    store_id?: number,
    store_name?: string,
    position_id?: number,
    position_name?: string,
    login?: string,
    role_id?: number,
    role_name?: string
}

interface IUserService {
    getEmployeeById(id: number): Promise<employee>;
    getEmployeeByIdStoredProcedure(id: number): Promise<employee>;
    getEmployeesByStoreId(store_id: number): Promise<employee[]>;
    updateEmployeeById(user: employee, userId: number): Promise<employee>;
    addEmployee(user: employee, userId: number): Promise<employee>;
    deleteEmployeeById(id: number, userId: number): Promise<void>;
}

export class UserService implements IUserService {

    constructor(
        private errorService: ErrorService
        ) { }

    public getEmployeeById(id: number): Promise<employee>
    {
        return new Promise<employee>((resolve, reject) =>
        {
            SqlHelper.executeQuerySingleResult<localUser>(this.errorService, Queries.GetUserById, id, Status.Active)
            .then((queryResult: localUser) => {
                resolve(this.parseLocalUser(queryResult));
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public getEmployeeByIdStoredProcedure(id: number): Promise<employee>
    {
        return new Promise<employee>((resolve, reject) =>
        {
            SqlHelper.executeStoredProcedureSingleResult<localUser>(this.errorService, StoredProcedures.GetEmployeeByIdSP, id, Status.Active)
            .then((queryResult: localUser) => {
                resolve(this.parseLocalUser(queryResult));
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public getEmployeesByStoreId(store_id: number): Promise<employee[]>
    {
        return new Promise<employee[]>((resolve, reject) => {
            const result: employee[] = [];

            SqlHelper.executeStoredProcedureArrayResult<localUser>(this.errorService, StoredProcedures.GetEmployeesByStoreIdSP, store_id, Status.Active)
            .then((queryResult: localUser[]) => {
                queryResult.forEach((user: localUser) => {
                    result.push(this.parseLocalUser(user));
                });

                resolve(result);
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public updateEmployeeById(employee: employee, userId: number): Promise<employee>
    {
        return new Promise<employee>((resolve, reject) => {
            SqlHelper.executeStoredProcedureNoResult(this.errorService, StoredProcedures.UpdateEmployeeByIdSP, false, 
                        employee.id,
                        employee.firstName,
                        employee.lastName,
                        employee.birthdate,
                        employee.is_male,
                        employee.phone,
                        employee.store_id,
                        employee.position_id,
                        employee.login,
                        employee.role_id, 
                        userId,
                        Status.Active)
            .then(() => {
                resolve(employee);
            })
            .catch((error: systemError) => {
                reject(error)
            });
        });
    }
    
    public addEmployee(employee: employee, userId: number): Promise<employee> {
        return new Promise<employee>((resolve, reject) => {

            SqlHelper.executeStoredProcedureWithOutput(this.errorService, StoredProcedures.CreateEmployeeSP, employee,
                employee.firstName,
                employee.lastName,
                employee.birthdate,
                (employee.is_male as number),
                employee.phone,
                (employee.store_id as number),
                (employee.position_id as number),
                (employee.login as string),
                (employee.password as string),
                (employee.role_id as number), 
                userId,
                Status.Active)
            .then((result: entityWithId) => {
                resolve(result as employee);
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public deleteEmployeeById(id: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SqlHelper.executeStoredProcedureNoResult(this.errorService, StoredProcedures.DeleteEmployeeByIdSP, true, id, userId, Status.Active, Status.NotActive)

            .then(() => {
                resolve();
            })
            .catch((error: systemError) => { 
                reject(error);
            });
        });
    }

    private parseLocalUser(local: localUser): employee {
        return {
            id: local.id,
            firstName: local.first_name,
            lastName: local.last_name,
            birthdate: local.birthdate,
            is_male: local.is_male,
            gender: local.gender,
            phone: local.phone,
            store_id: local.store_id,
            store_name: local.store_name,
            position_id: local.position_id,
            position_name: local.position_name,
            login: local.login,
            // password?: string;
            role_id: local.role_id,
            role_name: local.role_name
        };
    }
}