import express from "express";
import { Role } from "../enums";
import middleware from '../middleware/authentication.middleware';
import controller from '../controllers/product.controller';

const router = express.Router();

router.get('/get/:id', middleware.verifyToken([Role.Administrator, Role.Operator, Role.Operator]), controller.getProductById);
// ====== you are here ======
// router.get('/store-id/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.getAllProductsByStoreId);
// router.put('/update/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.updateProductById);
// router.post('/add/', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.addProduct);
// router.delete('/delete/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.deleteProductById);
// router.delete('/delete-product-location/:id', middleware.verifyToken([Role.Administrator, Role.Operator]), controller.deleteProductLocationById);

// Create designated service to serve products CRUD:
//      Get a list of all products by store id
//      Get an product by id
//      Update product info by id (including category)
//      Create new product and reference the location in store(s) (including category)

//      Delete a product by id
//      Add product location by location info, product id and a store id
//      Delete a location of a product
//      Get all product categories

//      Add a new product category
//      Delete an existing product category by category id

export default { router };