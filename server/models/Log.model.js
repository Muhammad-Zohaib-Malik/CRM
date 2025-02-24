import mongoose from 'mongoose'

const LogSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  startAt: {
    type: Date,
  },
  endAt: {
    type: Date,
  },
  followup: {
    type: String,
    required: true
  },
  status:{
    type:String,
    enum:['calling','busy','waiting','not received','switched off','not reachable'],
    default:'calling'
  },
});


LogSchema.pre("save",function (next){
  this.startAt=new Date()
  this.endAt=new Date()
  next()
})

export const Log = mongoose.model('Log', LogSchema);


