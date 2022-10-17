import * as _ from "underscore";
import { Queries, TEMP_USER_ID } from "../constants";
import { entityWithId, systemError, whiteBoardType } from "../entities";
import { Status } from "../enums";
import { DateHelper } from "../helpers/date.helper";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface localWhiteBoardType {
    id: number;
    white_board_type: string;
    create_date: Date;
    update_date: Date;
    create_user_id: Number;
    update_user_id: Number;
    status_id: Status;
}

interface ISchoolService {


    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardTypeById(id: number): Promise<whiteBoardType>;
    updateBoardTypeById(whiteBoardType: whiteBoardType, userId: number): Promise<whiteBoardType>;
    addBoardType(whiteBoardType: whiteBoardType, userId: number): Promise<whiteBoardType>;
    deleteBoardTypeById(id: number, userId: number): Promise<void>;
}

export class SchoolService implements ISchoolService {

    constructor(
        private errorService: ErrorService
        ) { }

    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            const result: whiteBoardType[] = [];

                SqlHelper.executeQueryArrayResult<localWhiteBoardType>(this.errorService, Queries.WhiteBoardTypes, Status.Active)
                .then((queryResult: localWhiteBoardType[]) => {
                    queryResult.forEach((whiteBoardType: localWhiteBoardType) => {
                        result.push(this.parseLocalBoardType(whiteBoardType));
                    });

                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public getBoardTypeById(id: number): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localWhiteBoardType>(this.errorService, Queries.WhiteBoardTypesById, id, Status.Active)
            .then((queryResult: localWhiteBoardType) => {
                resolve(this.parseLocalBoardType(queryResult));
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public updateBoardTypeById(whiteBoardType: whiteBoardType, userId: number): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(this.errorService, Queries.UpdateWhiteBoardById, false, whiteBoardType.type, DateHelper.dateToString(updateDate), userId, whiteBoardType.id, Status.Active)
            .then(() => {
                resolve(whiteBoardType);
            })
            .catch((error: systemError) => reject(error));
        });
    }


    
    public addBoardType(whiteBoardType: whiteBoardType, userId: number): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());
            SqlHelper.createNew(this.errorService, Queries.AddWhiteBoardType, whiteBoardType, whiteBoardType.type, createDate, createDate, userId, userId, Status.Active)
            .then((result: entityWithId) => {
                resolve(result as whiteBoardType);
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public deleteBoardTypeById(id: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: string = DateHelper.dateToString(new Date());
            SqlHelper.executeQueryNoResult(this.errorService, Queries.DeleteWhiteBoardTypeById, true, updateDate, userId, Status.NotActive, id, Status.Active)
            .then(() => {
                resolve();
            })
            .catch((error: systemError) => { 
                reject(error);
            });
        });
    }

    public getBoardTypeByTitle(title: string): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            SqlHelper.executeQueryArrayResult<localWhiteBoardType>(this.errorService, Queries.WhiteBoardTypesByTitle, `%${title}%`)
                .then((queryResult: localWhiteBoardType[]) => {
                    resolve(_.map(queryResult, (result: localWhiteBoardType) => this.parseLocalBoardType(result)));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private parseLocalBoardType(local: localWhiteBoardType): whiteBoardType {
        return {
            id: local.id,
            type: local.white_board_type
        }
    }
}