import * as _ from "underscore";
import { Queries } from "../constants";
import { entityWithId, store, systemError } from "../entities";
import { Status } from "../enums";
import { DateHelper } from "../helpers/date.helper";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface localStore {
    id: number;
    name: string;
    phone: string;
    address: string;
}

interface IStoreService {

    getStores(): Promise<store[]>;
    getStoreById(id: number): Promise<store>;
    updateStoreById(store: store, userId: number): Promise<store>;
    addStore(store: store, userId: number): Promise<store>;
    deleteStoreById(id: number, userId: number): Promise<void>;
}

export class StoreService implements IStoreService {

    constructor(
        private errorService: ErrorService
        ) { }

    public getStores(): Promise<store[]> {
        return new Promise<store[]>((resolve, reject) => {
            const result: store[] = [];

                SqlHelper.executeQueryArrayResult<localStore>(this.errorService, Queries.Stores, Status.Active)
                .then((queryResult: localStore[]) => {
                    queryResult.forEach((store: localStore) => {
                        result.push(this.parseLocalStore(store));
                    })

                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public getStoreById(id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localStore>(this.errorService, Queries.StoreById, id, Status.Active)
            .then((queryResult: localStore) => {
                resolve(this.parseLocalStore(queryResult));
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public updateStoreById(store: store, userId: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(this.errorService, Queries.UpdateStoreById, false, store.name, store.address, store.phone, DateHelper.dateToString(updateDate), userId, store.id, Status.Active)
            .then(() => {
                resolve(store);
            })
            .catch((error: systemError) => reject(error));
        });
    }


    
    public addStore(store: store, userId: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());
            SqlHelper.createNew(this.errorService, Queries.AddStore, store, store.name, store.address, store.phone, createDate, createDate, userId, userId, Status.Active)
            .then((result: entityWithId) => {
                resolve(result as store);
            })
            .catch((error: systemError) => {
                reject(error);
            });
        });
    }

    public deleteStoreById(id: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: string = DateHelper.dateToString(new Date());
            SqlHelper.executeQueryNoResult(this.errorService, Queries.DeleteStoreById, true, updateDate, userId, Status.NotActive, id, Status.Active)
            .then(() => {
                resolve();
            })
            .catch((error: systemError) => { 
                reject(error);
            });
        });
    }

    private parseLocalStore(local: localStore): store {
        return {
            id: local.id,
            name: local.name,
            phone: local.phone,
            address: local.address
            // create_date: local.create_date,
            // update_date: local.update_date,
            // create_user_id: local.create_user_id,
            // update_user_id: local.update_user_id,
            // status_id: local.status_id
        };
    }
}