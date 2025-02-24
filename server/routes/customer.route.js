import { Router } from "express";
import { createCustomer, fetchCustomer, fetchCustomerById, deleteCustomer, updateCustomer } from '../controllers/customer.controller';
const router = Router();

router.post('/customers', createCustomer);
router.get('/customers', fetchCustomer);
router.get('/customers/:id', fetchCustomerById);
router.delete('/customers/:id', deleteCustomer);
router.put('/customers/:id', updateCustomer);


export default Router