import { Connection, SqlClient, Error, Query, ProcedureManager } from "msnodesqlv8";
import { DB_CONNECTION_STRING, Queries } from "../constants";
import { entityWithId, systemError } from "../entities";
import { AppError } from "../enums";
import { ErrorService } from "../services/error.service";

export class SqlHelper {
    static sql: SqlClient = require("msnodesqlv8");

    public static executeQuerySingleResult<T>(errorService: ErrorService, query: string, ...params: (string | number)[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SqlHelper.openConnection(errorService)
            .then((connection: Connection) => {
                connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                    if (queryError) {
                        reject(errorService.getError(AppError.QueryError));
                    }
                    else {
                        const notFoundError: systemError = errorService.getError(AppError.NoData)
                        
                        if (queryResult !== undefined) {
                            switch (queryResult.length) {
                                case 0:
                                    reject(notFoundError);

                                case 1:
                                    resolve(queryResult[0]);
                                    break;

                                default: // In case more than a single result is returned
                                    resolve(queryResult[0]);
                                    break;
                            }
                        }
                        else {
                            reject(notFoundError);
                        }
                    }
                });
            })
            .catch((error: systemError) => {
                reject(error);
            })
        });
    }

    public static executeQueryArrayResult<T>(errorService: ErrorService, query: string, ...params: (string | number)[]): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            SqlHelper.openConnection(errorService)
            .then((connection: Connection) => {
                connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                    if (queryError) {
                        reject(errorService.getError(AppError.QueryError));
                    }
                    else {
                        if (queryResult !== undefined) {
                            resolve(queryResult);
                        }
                        else {
                            resolve([]);
                        }
                    }
                });
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    public static executeStoredProcedureSingleResult<T>(errorService: ErrorService, procedureName: string, ...params: (string | number)[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SqlHelper.openConnection(errorService)
                .then((connection) => {
                    const pm: ProcedureManager = connection.procedureMgr();
                    pm.callproc(procedureName, params, (storedProcedureError: Error | undefined, results: T[] | undefined, output: any[] | undefined) => {
                        if (storedProcedureError) {
                            reject(errorService.getError(AppError.QueryError));
                        }
                        else {
                            if (results !== undefined) {
                                resolve(results[0]);
                            }
                        }
                    });
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public static executeStoredProcedureArrayResult<T>(errorService: ErrorService, procedureName: string, ...params: (string | number)[]): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            SqlHelper.openConnection(errorService)
                .then((connection) => {
                    const pm: ProcedureManager = connection.procedureMgr();
                    pm.callproc(procedureName, params, (storedProcedureError: Error | undefined, results: T[] | undefined, output: any[] | undefined) => {
                        if (storedProcedureError) {
                            reject(errorService.getError(AppError.QueryError));
                        }
                        else {
                            if (results !== undefined) {
                                resolve(results);
                            }
                        }
                    });
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public static executeQueryNoResult(errorService: ErrorService, query: string, ignoreNoRowsAffected: boolean, ...params: (string | number)[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SqlHelper.openConnection(errorService)
            .then((connection: Connection) => {
                const q: Query = connection.query(query, params, (queryError: Error | undefined) => {
                    if (queryError) {
                        switch (queryError.code) {
                            case 547:
                                reject(errorService.getError(AppError.DeletionConflict));
                                break;
                            default:
                                reject(errorService.getError(AppError.QueryError));
                            }
                    }
                });

                q.on('rowcount', (count: number) => {
                    if ((count === 0) && !ignoreNoRowsAffected) {
                            reject(errorService.getError(AppError.NoData));
                            return;
                    }

                    resolve();
                });
            })

            .catch((error: systemError) => {
                reject(error);
            });
        });
    }     
    
    public static executeStoredProcedureNoResult(errorService: ErrorService, procedureName: string, ignoreNoRowsAffected: boolean, ...params: (string | number | Date | undefined)[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SqlHelper.openConnection(errorService)
            .then((connection: Connection) => {
                const pm: ProcedureManager = connection.procedureMgr();
                pm.callproc(procedureName, params, (storedProcedureError: Error | undefined, results: any[] | undefined, output: number[] | undefined) => {
                    if (storedProcedureError) {
                        switch (storedProcedureError.code) {
                            case 547:
                                reject(errorService.getError(AppError.DeletionConflict));
                                break;
                            default:
                                reject(errorService.getError(AppError.QueryError));
                            }
                    }
                    else {
                        resolve();
                    }
                });

                // pm.on('rowcount', (count: number) => {
                //     if ((count === 0) && !ignoreNoRowsAffected) {
                //             reject(errorService.getError(AppError.NoData));
                //             return;
                //     }

                //     resolve();
                // });
            })

            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public static createNew (errorService: ErrorService, query: string, original: entityWithId, ...params: (string | number | Date)[]): Promise<entityWithId> {
        return new Promise<entityWithId>((resolve, reject) => {
            SqlHelper.openConnection(errorService)
            .then((connection: Connection) => {

                const queries: string[] = [query, Queries.SelectIdentity];
                const executedQuery: string = queries.join(";");
                let executionCounter: number = 0;

                connection.query(executedQuery, params, (queryError: Error | undefined, queryResult: entityWithId[] | undefined) => {
                    if (queryError) {
                        reject(errorService.getError(AppError.QueryError));
                    }
                    else {
                        executionCounter++;
                        const badQueryError: systemError = errorService.getError(AppError.QueryError)
                        
                        if(executionCounter == queries.length) {
                            if (queryResult !== undefined) {
                                if (queryResult.length === 1) {
                                    original.id = queryResult[0].id;
                                    resolve(original);
                                }
                                else {
                                    reject(badQueryError);
                                    
                                }
                            }
                            else {
                                reject(badQueryError);
                            }
                        }
                    }
                });
            })
            .catch((error: systemError) => {
                reject(error);
            })
        });
    }



    public static executeStoredProcedureWithOutput(errorService: ErrorService, procedureName: string, original: entityWithId, ...params: (string | number | Date)[]): Promise<entityWithId> {
        return new Promise<entityWithId>((resolve, reject) => {
            SqlHelper.openConnection(errorService)
                .then((connection) => {
                    const pm: ProcedureManager = connection.procedureMgr();
                    params.push(42);
                    pm.callproc(procedureName, params, (storedProcedureError: Error | undefined, results: any[] | undefined, output: number[] | undefined) => {
                        if (storedProcedureError) {
                            reject(errorService.getError(AppError.QueryError));
                        }
                        else {
                            if (output?.length === 2) {
                                original.id = output[1];
                                resolve(original);
                            }
                            else {
                                reject(errorService.getError(AppError.QueryError));
                            }
                        }
                    });
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private static openConnection(errorService: ErrorService): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            SqlHelper.sql.open(DB_CONNECTION_STRING,  (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(errorService.getError(AppError.ConnectionError));
                }
                else {
                    resolve(connection);
                }
            });
        });    
    }
}