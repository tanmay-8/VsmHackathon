const Ticket = require('../models/Ticket');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const qr = require('qrcode');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require("uuid") // Import uuidv4 from uuid package

exports.createTicket = async (req, res) => {
  try {
    const {
      name,
      email,
      visitDate,
      numberOfChildren,
      numberOfMales,
      numberOfFemales,
      totalCharges,
    } = req.body

    // Calculate numberOfVisitors
    const numberOfVisitors = parseInt(numberOfChildren) + parseInt(numberOfMales) + parseInt(numberOfFemales)

    // Generate unique ticketId
    const ticketId = uuidv4()

    const ticket = new Ticket({
      name,
      email,
      visitDate,
      numberOfVisitors,
      ticketId, // Assign generated ticketId
      numberOfChildren,
      numberOfMales,
      numberOfFemales,
      totalCharges,
      paymentStatus: true,
      bookingDate: Date.now(),
    })

    await ticket.save()

    const qrData = JSON.stringify({
      name: ticket.name,
      ticketId: ticket.ticketId,
      visitDate: ticket.visitDate,
      Child: ticket.numberOfChildren,
      Male: ticket.numberOfMales,
      Female: ticket.numberOfFemales,
      Total_Count: ticket.numberOfVisitors,
    })

    const qrImagePath = `./tickets/${ticket.ticketId}-qr.png`

    await new Promise((resolve, reject) => {
      qr.toFile(qrImagePath, qrData, (err) => {
        if (err) {
          console.error("Error generating QR code:", err)
          reject(err)
        } else {
          console.log("QR code generated successfully")
          resolve()
        }
      })
    })

    const pdfPath = `./tickets/${ticket.ticketId}.pdf`
    const pdfDoc = new PDFDocument()
    const pdfStream = fs.createWriteStream(pdfPath)

    pdfDoc.pipe(pdfStream)

    pdfDoc.fontSize(16).text(`Ticket Information`, { align: "center" })
    pdfDoc.text(
      "---------------------------------------------------------------------------------------"
    )
    pdfDoc.text(`Name: ${ticket.name}`)
    pdfDoc.text(`Ticket Number: ${ticket.ticketId}`)
    pdfDoc.text(`Visit Date: ${ticket.visitDate}`)
    pdfDoc.text(`Child Count: ${ticket.numberOfChildren}`)
    pdfDoc.text(`Male Count: ${ticket.numberOfMales}`)
    pdfDoc.text(`Female Count: ${ticket.numberOfFemales}`)
    pdfDoc.text(`Total Count: ${ticket.numberOfVisitors}`)
    pdfDoc.text(`Total Charges: ${ticket.totalCharges}`)
    const qrImageBuffer = fs.readFileSync(qrImagePath)
    const qrImageY = pdfDoc.page.height - 150 - 50 // Adjust 50 to add some padding from the bottom

    pdfDoc.image(qrImageBuffer, 50, qrImageY, {
      fit: [150, 150],
    })

    pdfDoc.text(
      `\n\nThank you for choosing to visit our heritage site. We hope you have a memorable and enjoyable experience.\n\nBest regards,\nHeritage Site Team`
    )

    pdfDoc.end()

    // Send email with PDF attachment
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Ticket from heritage site",
      text: `
      Thank you for visiting our heritage site.
      We wish you a pleasant visit.
      Regards, 
      Heritage Site Team
      
      
      
      Please find your ticket attached.`,
      attachments: [
        {
          filename: `${ticket.ticketId}.pdf`,
          path: pdfPath,
        },
      ],
    }

    await transporter.sendMail(mailOptions)

    res
      .status(201)
      .json({ message: "Ticket created successfully and email sent", ticket })
  } catch (error) {
    console.error("Error creating ticket:", error)
    res.status(500).json({ message: "Server error", error })
  }
}

exports.getTicketByNumber = async (req, res) => {
  const ticketId = req.params.ticketId

  try {
    const ticket = await Ticket.findOne({ ticketId })

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" })
    }

    res.status(200).json(ticket)
  } catch (error) {
    console.error("Error finding ticket:", error)
    res.status(500).json({ message: "Server error", error })
  }
}

exports.getTicketByNumber = async (req, res) => {
  const ticketId = req.params.ticketId

  try {
    const ticket = await Ticket.findOne({ ticketId })

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" })
    }

    res.status(200).json(ticket)
  } catch (error) {
    console.error("Error finding ticket:", error)
    res.status(500).json({ message: "Server error", error })
  }
}
  