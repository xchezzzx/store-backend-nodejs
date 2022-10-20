import { Request, Response, NextFunction } from 'express';
import { NON_EXISTING_ID } from '../constants';
import { AuthenticatedRequest, systemError, store } from '../entities';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.service';
import { StoreService } from '../services/store.service';

const errorService: ErrorService = new ErrorService();
const storeService: StoreService = new StoreService(errorService);

const getStores = async (req: Request, res: Response, next: NextFunction) => {
    console.log("User data: ", (req as AuthenticatedRequest).userData)
    storeService.getStores()
        .then((result: store[]) => {
            return res.status(200).json({
                stores: result
            });     
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

const getStoreById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
            storeService.getStoreById(numericParamOrError)
                .then((result: store) => {
                    return res.status(200).json(result);     
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
            }
            else {
                // TODO: Error handling
            } 
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
};

const updateStoreById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: store = req.body;

                storeService.updateStoreById({
                    id: numericParamOrError,
                    name: body.name,
                    phone: body.phone,
                    address: body.address
                }, (req as AuthenticatedRequest).userData.userId)
                .then((result: store) => {
                    return res.status(200).json(result);     
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                })
            }
            else {
                // TODO: Error handling
            } 
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
};

const addStore = async (req: Request, res: Response, next: NextFunction) => {
    const body: store = req.body;

    storeService.addStore({
        id: NON_EXISTING_ID,
        name: body.name,
        phone: body.phone,
        address: body.address
    }, (req as AuthenticatedRequest).userData.userId)

        .then((result: store) => {
            return res.status(200).json(result);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        })
};

const deleteStoreById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                storeService.deleteStoreById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
                .then(() => {
                    return res.sendStatus(200);     
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                })
            }
            else {
                // TODO: Error handling
            } 
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
};

export default { getStores, getStoreById, updateStoreById, addStore, deleteStoreById };