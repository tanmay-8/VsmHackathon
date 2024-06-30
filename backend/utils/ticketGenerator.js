const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const generateTicketPDF = async (ticket) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, `../tickets/${ticket.ticketId}.pdf`)
  const writeStream = fs.createWriteStream(filePath)
  doc.pipe(writeStream)

  doc.fontSize(25).text("Heritage Site Ticket", { align: "center" })
  doc.moveDown()
  doc.fontSize(16).text(`Ticket Number: ${ticket.ticketId}`)
  doc.text(`Name: ${ticket.name}`)
  doc.text(`Email: ${ticket.email}`)
  doc.text(`Visit Date: ${new Date(ticket.visitDate).toDateString()}`)
  doc.text(`Number of Visitors: ${ticket.numberOfVisitors}`)

  const qrCodeData = `Ticket Number: ${ticket.ticketId}\nNumber of Visitors: ${
    ticket.numberOfVisitors
  }\nVisit Date: ${new Date(ticket.visitDate).toDateString()}`
  const qrCodeImage = await QRCode.toDataURL(qrCodeData);

  doc.image(qrCodeImage, { fit: [150, 150], align: 'center' });

  doc.end();

  return filePath;
};

module.exports = { generateTicketPDF };
