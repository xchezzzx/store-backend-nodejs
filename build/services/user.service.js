"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const date_helper_1 = require("../helpers/date.helper");
const sql_helper_1 = require("../helpers/sql.helper");
class UserService {
    constructor(errorService) {
        this.errorService = errorService;
    }
    updateById(user, userId) {
        return new Promise((resolve, reject) => {
            const updateDate = new Date();
            sql_helper_1.SqlHelper.executeQueryNoResult(this.errorService, constants_1.Queries.UpdateUserById, false, user.firstName, user.lastName, date_helper_1.DateHelper.dateToString(updateDate), userId, user.id, enums_1.Status.Active)
                .then(() => {
                resolve(user);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    add(user, userId) {
        return new Promise((resolve, reject) => {
            const createDate = date_helper_1.DateHelper.dateToString(new Date());
            sql_helper_1.SqlHelper.createNew(this.errorService, constants_1.Queries.AddUser, user, user.firstName, user.lastName, user.login, user.password, enums_1.Role.RegularUser, createDate, createDate, userId, userId, enums_1.Status.Active)
                .then((result) => {
                resolve(result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    deleteById(id, userId) {
        return new Promise((resolve, reject) => {
            const updateDate = date_helper_1.DateHelper.dateToString(new Date());
            sql_helper_1.SqlHelper.executeQueryNoResult(this.errorService, constants_1.Queries.DeleteUserById, true, updateDate, userId, enums_1.Status.NotActive, id, enums_1.Status.Active)
                .then(() => {
                resolve();
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
}
exports.UserService = UserService;
