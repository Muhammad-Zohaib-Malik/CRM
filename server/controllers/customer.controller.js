import { Customer } from '../models/customer.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create a new customer
export const createCustomer = asyncHandler(async (req, res ) => {
  const { fullname, email, mobile } = req.body;
  const customer = new Customer({ fullname, email, mobile });
  await customer.save();
  res.status(201).json(new ApiResponse(201, customer, 'Customer created successfully'));
});

// Fetch all customers
export const fetchCustomer = asyncHandler(async (_, res ) => {
  const customers = await Customer.find();
  res.status(200).json(new ApiResponse(200, customers, 'Customers fetched successfully'));
});

// Fetch a customer by ID
export const fetchCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  if (!customer) {
    return next(new ApiError(404, 'Customer not found'));
  }
  res.status(200).json(new ApiResponse(200, customer, 'Customer fetched successfully'));
});

// Delete a customer
export const deleteCustomer = asyncHandler(async (req, res ) => {
  const { id } = req.params;
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) {
    return next(new ApiError(404, 'Customer not found'));
  }
  res.status(200).json(new ApiResponse(200, customer, 'Customer deleted successfully'));
});

// Update a customer
export const updateCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { fullname, email, mobile } = req.body;
  const customer = await Customer.findByIdAndUpdate(id, { fullname, email, mobile }, { new: true});
  if (!customer) {
    return next(new ApiError(404, 'Customer not found'));
  }
  res.status(200).json(new ApiResponse(200, customer, 'Customer updated successfully'));
});
