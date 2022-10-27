import { StoredProcedures } from "../constants";
import { product, systemError } from "../entities";
import { Status } from "../enums";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface localProduct {

}

interface IProductService {
    getProductById(id: number): Promise<product>;
    getAllProductsByStoreId(id: number): Promise<product[]>;
    updateProductById(id: number): Promise<product>;
    addProduct(product: product, userId: number): Promise<product>;
    deleteProductById(id: number, userId: number): Promise<void>;
    deleteProductLocationById(location_id: number, userId: number): Promise<void>;
}

export class ProductService implements IProductService{

    constructor(
        private errorService: ErrorService
    ) {}

    public getProductById(id: number): Promise<product> {

        return new Promise<product>((resolve, reject) => {
            SqlHelper.executeStoredProcedureSingleResult<product>(this.errorService, StoredProcedures.GetProductById, id, Status.Active)
            .then((spResult: product) => {
                resolve(spResult);
            })
            .catch((error: systemError) => {
                reject(error);
            })
        })
        // throw new Error("Method not implemented.");
    }

    public getAllProductsByStoreId(id: number): Promise<product[]> {
        throw new Error("Method not implemented.");
    }

    public updateProductById(id: number): Promise<product> {
        throw new Error("Method not implemented.");
    }

    public addProduct(product: product, userId: number): Promise<product> {
        throw new Error("Method not implemented.");
    }

    public deleteProductById(id: number, userId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    public deleteProductLocationById(location_id: number, userId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}