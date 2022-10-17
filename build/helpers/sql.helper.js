"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlHelper = void 0;
const constants_1 = require("../constants");
const enums_1 = require("../enums");
class SqlHelper {
    static executeQueryArrayResult(errorService, query, ...params) {
        return new Promise((resolve, reject) => {
            SqlHelper.openConnection(errorService)
                .then((connection) => {
                connection.query(query, params, (queryError, queryResult) => {
                    if (queryError) {
                        reject(errorService.getError(enums_1.AppError.QueryError));
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
    static executeQuerySingleResult(errorService, query, ...params) {
        return new Promise((resolve, reject) => {
            SqlHelper.openConnection(errorService)
                .then((connection) => {
                connection.query(query, params, (queryError, queryResult) => {
                    if (queryError) {
                        reject(errorService.getError(enums_1.AppError.QueryError));
                    }
                    else {
                        const notFoundError = errorService.getError(enums_1.AppError.NoData);
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
                .catch((error) => {
                reject(error);
            });
        });
    }
    static executeQueryNoResult(errorService, query, ignoreNoRowsAffected, ...params) {
        return new Promise((resolve, reject) => {
            SqlHelper.openConnection(errorService)
                .then((connection) => {
                const q = connection.query(query, params, (queryError) => {
                    if (queryError) {
                        switch (queryError.code) {
                            case 547:
                                reject(errorService.getError(enums_1.AppError.DeletionConflict));
                                break;
                            default:
                                reject(errorService.getError(enums_1.AppError.QueryError));
                        }
                    }
                });
                q.on('rowcount', (count) => {
                    if ((count === 0) && !ignoreNoRowsAffected) {
                        reject(errorService.getError(enums_1.AppError.NoData));
                        return;
                    }
                    resolve();
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static createNew(errorService, query, original, ...params) {
        return new Promise((resolve, reject) => {
            SqlHelper.openConnection(errorService)
                .then((connection) => {
                const queries = [query, constants_1.Queries.SelectIdentity];
                const executedQuery = queries.join(";");
                let executionCounter = 0;
                connection.query(executedQuery, params, (queryError, queryResult) => {
                    if (queryError) {
                        reject(errorService.getError(enums_1.AppError.QueryError));
                    }
                    else {
                        executionCounter++;
                        const badQueryError = errorService.getError(enums_1.AppError.QueryError);
                        if (executionCounter == queries.length) {
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
                .catch((error) => {
                reject(error);
            });
        });
    }
    static openConnection(errorService) {
        return new Promise((resolve, reject) => {
            SqlHelper.sql.open(constants_1.DB_CONNECTION_STRING, (connectionError, connection) => {
                if (connectionError) {
                    reject(errorService.getError(enums_1.AppError.ConnectionError));
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
}
exports.SqlHelper = SqlHelper;
SqlHelper.sql = require("msnodesqlv8");
