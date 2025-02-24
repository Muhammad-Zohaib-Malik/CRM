import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true,'Fullname is required'],
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: [true,"Email is required"],
    trim: true
  },
  mobile: {
    type: String,
    required: [true,"Mobile number is required"],
    unique: true,
    trim: true
  },
  status:{
    type:String,
    enum:['pending','cold','hot','closed','denied'],
    default:'pending'
  }
}, {
  timestamps: true
});

export const Customer = mongoose.model('Customer', customerSchema);


