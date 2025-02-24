import { Router } from "express";
import { createCustomer, fetchCustomer, fetchCustomerById, deleteCustomer, updateCustomer } from '../controllers/customer.controller.js';
const customerRouter = Router();

customerRouter.post('/', createCustomer);
customerRouter.get('/', fetchCustomer);
customerRouter.get('/:id', fetchCustomerById);
customerRouter.delete('/:id', deleteCustomer);
customerRouter.put('/:id', updateCustomer);


export default customerRouter