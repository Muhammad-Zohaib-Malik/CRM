import { Customer } from '../models/customer.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create a new customer
export const createCustomer = asyncHandler(async (req, res) => {
  const { fullname, email, mobile } = req.body;
  const existingCustomer = await Customer.findOne({ email });
  if (existingCustomer) {
    throw new ApiError(409, "Email already exists");
  }
  const customer = new Customer({ fullname, email, mobile });
  await customer.save();
  res.status(201).json(new ApiResponse(201, customer, 'Customer created successfully'));
});

// Fetch all customers
export const fetchCustomer = asyncHandler(async (req, res) => {
  const page = req.query.page || 1
  const limit = 5
  const skip = (page - 1) * limit
  const customers = await Customer.find().skip(skip).limit(limit).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, customers, 'Customers fetched successfully'));
});

// Fetch a customer by ID
export const fetchCustomerById = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const customer = await Customer.findById(id);
  if (!customer) {
    throw new ApiError(409, "customer not found")
  }
  res.status(200).json(new ApiResponse(200, customer, 'Customer fetched successfully'));
});

// Delete a customer
export const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) {
    throw new ApiError(409, "customer not found")
  }
  res.status(200).json(new ApiResponse(200, customer, 'Customer deleted successfully'));
});

// Update a customer
export const updateCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { fullname, email, mobile } = req.body;
  const customer = await Customer.findByIdAndUpdate(id, { fullname, email, mobile }, { new: true });
  if (!customer) {
    throw new ApiError(409, "customer not found")
  }
  res.status(200).json(new ApiResponse(200, customer, 'Customer updated successfully'));
});
