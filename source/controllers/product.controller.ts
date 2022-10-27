import { Request, Response, NextFunction } from "express";
import { product, systemError } from "../entities";
import { RequestHelper } from "../helpers/request.helper";
import { ResponseHelper } from "../helpers/response.helper";
import { ErrorService } from "../services/error.service";
import { ProductService } from "../services/product.service";

const errorService: ErrorService = new ErrorService();
const productService = new ProductService(errorService);

const getProductById = async (req: Request, res: Response, next: NextFunction) => {

    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id);
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            productService.getProductById(numericParamOrError)
            .then((result: product) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
        }
        else {

        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};


export default { getProductById };