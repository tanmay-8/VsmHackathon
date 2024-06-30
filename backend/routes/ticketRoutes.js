const express = require('express');
const { createTicket, getTicketByNumber } = require('../controllers/ticketController');
const router = express.Router();


router.route('/tickets').post(createTicket);
router.get('/tickets/:ticketNumber', getTicketByNumber);
module.exports = router; 