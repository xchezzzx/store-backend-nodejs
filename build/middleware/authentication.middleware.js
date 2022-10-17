"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const verifyToken = (roles) => (req, res, next) => {
    var _a;
    let token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.toString();
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        // 'Bearer...................'
        token = token.substring("Bearer ".length);
        const decoded = jsonwebtoken_1.default.verify(token, constants_1.TOKEN_SECRET);
        if (roles.indexOf(decoded.userData.roleId) === -1) {
            return res.sendStatus(401);
        }
        req.userData = decoded.userData;
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
exports.default = { verifyToken };
