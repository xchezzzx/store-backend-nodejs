"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
const _ = __importStar(require("underscore"));
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const date_helper_1 = require("../helpers/date.helper");
const sql_helper_1 = require("../helpers/sql.helper");
class SchoolService {
    constructor(errorService) {
        this.errorService = errorService;
    }
    getBoardTypes() {
        return new Promise((resolve, reject) => {
            const result = [];
            sql_helper_1.SqlHelper.executeQueryArrayResult(this.errorService, constants_1.Queries.WhiteBoardTypes, enums_1.Status.Active)
                .then((queryResult) => {
                queryResult.forEach((whiteBoardType) => {
                    result.push(this.parseLocalBoardType(whiteBoardType));
                });
                resolve(result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getBoardTypeById(id) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SqlHelper.executeQuerySingleResult(this.errorService, constants_1.Queries.WhiteBoardTypesById, id, enums_1.Status.Active)
                .then((queryResult) => {
                resolve(this.parseLocalBoardType(queryResult));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    updateBoardTypeById(whiteBoardType, userId) {
        return new Promise((resolve, reject) => {
            const updateDate = new Date();
            sql_helper_1.SqlHelper.executeQueryNoResult(this.errorService, constants_1.Queries.UpdateWhiteBoardById, false, whiteBoardType.type, date_helper_1.DateHelper.dateToString(updateDate), userId, whiteBoardType.id, enums_1.Status.Active)
                .then(() => {
                resolve(whiteBoardType);
            })
                .catch((error) => reject(error));
        });
    }
    addBoardType(whiteBoardType, userId) {
        return new Promise((resolve, reject) => {
            const createDate = date_helper_1.DateHelper.dateToString(new Date());
            sql_helper_1.SqlHelper.createNew(this.errorService, constants_1.Queries.AddWhiteBoardType, whiteBoardType, whiteBoardType.type, createDate, createDate, userId, userId, enums_1.Status.Active)
                .then((result) => {
                resolve(result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    deleteBoardTypeById(id, userId) {
        return new Promise((resolve, reject) => {
            const updateDate = date_helper_1.DateHelper.dateToString(new Date());
            sql_helper_1.SqlHelper.executeQueryNoResult(this.errorService, constants_1.Queries.DeleteWhiteBoardTypeById, true, updateDate, userId, enums_1.Status.NotActive, id, enums_1.Status.Active)
                .then(() => {
                resolve();
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getBoardTypeByTitle(title) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SqlHelper.executeQueryArrayResult(this.errorService, constants_1.Queries.WhiteBoardTypesByTitle, `%${title}%`)
                .then((queryResult) => {
                resolve(_.map(queryResult, (result) => this.parseLocalBoardType(result)));
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    parseLocalBoardType(local) {
        return {
            id: local.id,
            type: local.white_board_type
        };
    }
}
exports.SchoolService = SchoolService;
