import { Log } from '../models/Log.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create a new log
export const createLogs = asyncHandler(async (req, res) => {
  const { customer, followup, status } = req.body;
  const log = new Log({ customer, followup, status });
  await log.save();
  res.status(201).json(new ApiResponse(201, log, 'Log created successfully'));
});

// Fetch all logs
export const fetchLogs = asyncHandler(async (_, res) => {
  const logs = await Log.find().populate('customer');
  res.status(200).json(new ApiResponse(200, logs, 'Logs fetched successfully'));
});

// Fetch a log by ID
export const fetchLogsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const log = await Log.findById(id).populate('customer');
  if (!log) {
    return next(new ApiError(404, 'Log not found'));
  }
  res.status(200).json(new ApiResponse(200, log, 'Log fetched successfully'));
});

// Delete a log
export const deleteLogs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const log = await Log.findByIdAndDelete(id);
  if (!log) {
    return next(new ApiError(404, 'Log not found'));
  }
  res.status(200).json(new ApiResponse(200, log, 'Log deleted successfully'));
});

// Update a log
export const updateLogs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { customer, followup, status } = req.body;
  const log = await Log.findByIdAndUpdate(id, { customer, followup, status }, { new: true });
  if (!log) {
    return next(new ApiError(404, 'Log not found'));
  }
  res.status(200).json(new ApiResponse(200, log, 'Log updated successfully'));
});
