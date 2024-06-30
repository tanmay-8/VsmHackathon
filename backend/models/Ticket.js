const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  visitDate: { type: Date, required: true },
  numberOfVisitors: { type: Number, required: true },
  ticketId: { type: String, unique: true },
  qrCode: { type: String },
  paymentStatus: { type: Boolean, default: false },
  bookingDate: { type: Date, required: true, default: Date.now },
  visitingDate: { type: Date },
  numberOfChildren: { type: Number },
  numberOfMales: { type: Number },
  numberOfFemales: { type: Number },
  totalCharges: { type: Number },
})

const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;
