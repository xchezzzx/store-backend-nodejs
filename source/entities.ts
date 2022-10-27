import { Request } from "express";
import { Gender, Role, Status } from "./enums";

export interface entityWithId {
    id: number;
}

export interface whiteBoardType extends entityWithId{
    type: string;
}

export interface store extends entityWithId{
    name: string;
    phone: string;
    address: string;
}

export interface employee extends entityWithId {
    firstName: string;
    lastName: string;
    birthdate: string;
    is_male?: number;
    gender?: string;
    phone: string;
    store_id?: number;
    store_name?: string;
    position_id?: number;
    position_name?: string;
    login?: string;
    password?: string;
    role_id?: number;
    role_name?: string;
}

export interface product extends entityWithId {
    vendor: string;
    name: string;
    category_id?: number;
    category_name?: string;
    price: number;
    amount?: number;
}

export interface systemError {
    key: string;
    code: number;
    message: string;
}

export interface sqlParameter {
    name: string;
    type: any;
    value: string | number;
}

export interface authenticationToken {
    userData: jwtUserData;
}

export interface jwtUserData {
    userId: number;
    roleId: Role;
}

export  interface AuthenticatedRequest extends Request, authenticationToken { }