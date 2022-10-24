import * as _ from "underscore";
import { Queries, StoredProcedures } from "../constants";
import { entityWithId, systemError, user } from "../entities";
import { Gender, Role, Status } from "../enums";
import { DateHelper } from "../helpers/date.helper";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface localUser
{
    id: number,
    first_name: string,
    last_name: string,
    birthdate: Date,
    is_male?: number,
    gender?: string,
    phone: string,
    store: string,
    position_id?: number,
    position_name?: string,
    login?: string,
    role_id?: number,
    role_name?: string
}

interface IUserService {
    getEmployeeById(id: number): Promise<user>;
    getEmployeeByIdStoredProcedure(id: number): Promise<user>;
    updateEmployeeById(user: user, userId: number): Promise<user>;
    addEmployee(user: user, userId: number): Promise<user>;
    deleteEmployeeById(id: number, userId: number): Promise<void>;
}

export class UserService implements IUserService {

    constructor(
        private errorService: ErrorService
        ) { }

    public getEmployeeById(id: number): Promise<user>
    {
        return new Promise<user>((resolve, reject) =>
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

    public getEmployeeByIdStoredProcedure(id: number): Promise<user>
    {
        return new Promise<user>((resolve, reject) =>
        {
            SqlHelper.executeStoredProcedureSingleResult<localUser>(this.errorService, StoredProcedures.GetUserByIdSP, id, Status.Active)
            .then((queryResult: localUser) => {
                resolve(this.parseLocalUser(queryResult));
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public updateEmployeeById(user: user, userId: number): Promise<user>
    {
        return new Promise<user>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(this.errorService, Queries.UpdateUserById, false, user.firstName, user.lastName, DateHelper.dateToString(updateDate), userId, user.id, Status.Active)
            .then(() => {
                resolve(user);
            })
            .catch((error: systemError) => {
                reject(error)
            });
        });
    }
    
    public addEmployee(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());
            SqlHelper.createNew(this.errorService, Queries.AddUser, user, user.firstName, user.lastName, user.login as string, user.password as string, Role.RegularUser, createDate, createDate, userId, userId, Status.Active)
            .then((result: entityWithId) => {
                resolve(result as user);
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public deleteEmployeeById(id: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: string = DateHelper.dateToString(new Date());
            SqlHelper.executeQueryNoResult(this.errorService, Queries.DeleteUserById, true, updateDate, userId, Status.NotActive, id, Status.Active)
            .then(() => {
                resolve();
            })
            .catch((error: systemError) => { 
                reject(error);
            });
        });
    }

    private parseLocalUser(local: localUser): user {
        return {
            id: local.id,
            firstName: local.first_name,
            lastName: local.last_name,
            birthdate: local.birthdate,
            is_male: local.is_male,
            gender: local.gender,
            phone: local.phone,
            store: local.store,
            position_id: local.position_id,
            position_name: local.position_name,
            login: local.login,
            // password?: string;
            role_id: local.role_id,
            role_name: local.role_name
        };
    }
}