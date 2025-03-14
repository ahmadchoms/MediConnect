import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

const generateInvoicePDF = async (appointment, user) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Standard US Letter size

  // Embed fonts
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Modern color palette
  const COLORS = {
    PRIMARY: rgb(0.18, 0.45, 0.71), // Medium blue
    SECONDARY: rgb(0.85, 0.85, 0.95), // Light lavender
    ACCENT: rgb(0.35, 0.73, 0.88), // Sky blue
    TEXT_PRIMARY: rgb(0.2, 0.2, 0.25), // Dark gray for primary text
    TEXT_SECONDARY: rgb(0.5, 0.5, 0.55), // Medium gray for secondary text
    WHITE: rgb(1, 1, 1),
    LINE: rgb(0.9, 0.9, 0.95), // Very light gray for lines
  };

  // Helper for drawing text
  const addText = (text, x, y, size, options = {}) => {
    const {
      font = regularFont,
      color = COLORS.TEXT_PRIMARY,
      align = "left",
      maxWidth = undefined,
      opacity = 1,
    } = options;

    let xPos = x;
    if (align === "right") {
      const textWidth = font.widthOfTextAtSize(text, size);
      xPos = x - textWidth;
    } else if (align === "center") {
      const textWidth = font.widthOfTextAtSize(text, size);
      xPos = x - textWidth / 2;
    }

    page.drawText(text, {
      x: xPos,
      y,
      size,
      font,
      color,
      opacity,
      maxWidth,
      lineHeight: size * 1.3,
    });

    return font.widthOfTextAtSize(text, size);
  };

  // Draw header background
  page.drawRectangle({
    x: 0,
    y: 702,
    width: 612,
    height: 90,
    color: COLORS.PRIMARY,
  });

  // Add clinic logo placeholder
  page.drawRectangle({
    x: 40,
    y: 722,
    width: 50,
    height: 50,
    color: COLORS.ACCENT,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    opacity: 0.9,
    borderOpacity: 0.5,
  });

  // Add invoice title and clinic name
  addText("INVOICE", 110, 752, 24, { font: boldFont, color: COLORS.WHITE });
  addText("Klinik MediConnect", 110, 730, 12, {
    color: COLORS.WHITE,
    opacity: 0.9,
  });

  // Add invoice number
  addText(`#${appointment.invoice}`, 560, 752, 14, {
    font: boldFont,
    color: COLORS.WHITE,
    align: "right",
  });

  // Add invoice date
  addText(`Tanggal: ${appointment.date}`, 560, 735, 10, {
    color: COLORS.WHITE,
    opacity: 0.9,
    align: "right",
  });

  // Contact information section
  const contactY = 660;
  addText("Informasi Kontak", 40, contactY, 14, {
    font: boldFont,
    color: COLORS.PRIMARY,
  });

  // Horizontal line under section title
  page.drawLine({
    start: { x: 40, y: contactY - 10 },
    end: { x: 200, y: contactY - 10 },
    thickness: 2,
    color: COLORS.LINE,
  });

  // Clinic address
  addText("Klinik MediConnect", 40, contactY - 25, 11, { font: boldFont });
  addText("Jl. Kesehatan No. 123", 40, contactY - 40, 10, {
    color: COLORS.TEXT_SECONDARY,
  });
  addText("Jakarta, Indonesia 12345", 40, contactY - 55, 10, {
    color: COLORS.TEXT_SECONDARY,
  });
  addText("Telepon: (021) 555-1234", 40, contactY - 70, 10, {
    color: COLORS.TEXT_SECONDARY,
  });
  addText("Email: info@mediconnect.id", 40, contactY - 85, 10, {
    color: COLORS.TEXT_SECONDARY,
  });

  // Patient information
  const patientY = 660;
  addText("Pasien", 350, patientY, 14, {
    font: boldFont,
    color: COLORS.PRIMARY,
  });

  // Horizontal line under section title
  page.drawLine({
    start: { x: 350, y: patientY - 10 },
    end: { x: 570, y: patientY - 10 },
    thickness: 2,
    color: COLORS.LINE,
  });

  // Patient details - these would be populated from appointment
  addText(`Nama: ${user.name || "Nama Pasien"}`, 350, patientY - 25, 10);
  addText(
    `ID Pasien: ${appointment.userId || "P12345"}`,
    350,
    patientY - 40,
    10
  );
  addText(
    `Telepon: ${user.phoneNumber || "(+62) 123-456-789"}`,
    350,
    patientY - 55,
    10
  );
  addText(`Email: ${user.email || "pasien@email.com"}`, 350, patientY - 70, 10);

  // Appointment details section
  const appointmentY = 550;
  addText("Detail Janji Temu", 40, appointmentY, 14, {
    font: boldFont,
    color: COLORS.PRIMARY,
  });

  // Horizontal line under section title
  page.drawLine({
    start: { x: 40, y: appointmentY - 10 },
    end: { x: 570, y: appointmentY - 10 },
    thickness: 2,
    color: COLORS.LINE,
  });

  // Table header background
  page.drawRectangle({
    x: 40,
    y: appointmentY - 40,
    width: 530,
    height: 25,
    color: COLORS.SECONDARY,
  });

  // Table headers
  addText("Deskripsi", 50, appointmentY - 30, 10, { font: boldFont });
  addText("Detail", 350, appointmentY - 30, 10, { font: boldFont });

  // Table rows - Appointment details
  let rowY = appointmentY - 60;

  // Doctor info
  addText("Dokter", 50, rowY, 10, { font: italicFont });
  addText(appointment.doctor, 350, rowY, 10);
  rowY -= 20;

  // Specialty
  addText("Spesialis", 50, rowY, 10, { font: italicFont });
  addText(appointment.specialty, 350, rowY, 10);
  rowY -= 20;

  // Date and time
  addText("Tanggal & Waktu", 50, rowY, 10, { font: italicFont });
  addText(`${appointment.date}, ${appointment.time}`, 350, rowY, 10);
  rowY -= 20;

  // Reason for visit
  addText("Alasan Kunjungan", 50, rowY, 10, { font: italicFont });
  addText(appointment.reason, 350, rowY, 10);
  rowY -= 30;

  // Billing section
  const billingY = 380;
  addText("Rincian Biaya", 40, billingY, 14, {
    font: boldFont,
    color: COLORS.PRIMARY,
  });

  // Horizontal line under section title
  page.drawLine({
    start: { x: 40, y: billingY - 10 },
    end: { x: 570, y: billingY - 10 },
    thickness: 2,
    color: COLORS.LINE,
  });

  // Table header background
  page.drawRectangle({
    x: 40,
    y: billingY - 40,
    width: 530,
    height: 25,
    color: COLORS.SECONDARY,
  });

  // Table headers
  addText("Layanan", 50, billingY - 30, 10, { font: boldFont });
  addText("Biaya", 500, billingY - 30, 10, { font: boldFont, align: "right" });

  // Billing items
  const costs = [
    {
      description: "Biaya Konsultasi",
      amount: appointment.appointmentFee,
    },
    {
      description: "Biaya Penanganan",
      amount: appointment.handlingFee,
    },
    { description: "Biaya Obat", amount: appointment.medicationFee },
  ];

  rowY = billingY - 60;
  costs.forEach((cost) => {
    addText(cost.description, 50, rowY, 10);
    addText(`Rp ${cost.amount.toLocaleString()}`, 520, rowY, 10, {
      align: "right",
    });

    // Add light separator line
    page.drawLine({
      start: { x: 40, y: rowY - 8 },
      end: { x: 570, y: rowY - 8 },
      thickness: 1,
      color: COLORS.LINE,
    });

    rowY -= 25;
  });

  // Calculate total
  const totalFee = costs.reduce((sum, cost) => sum + cost.amount, 0);

  // Total with tax
  addText("TOTAL", 300, rowY - 15, 12, {
    font: boldFont,
    align: "right",
    color: COLORS.PRIMARY,
  });
  addText(`Rp ${totalFee.toLocaleString()}`, 520, rowY - 15, 12, {
    font: boldFont,
    align: "right",
  });

  // Payment information section
  const paymentY = 180;
  addText("Informasi Pembayaran", 40, paymentY, 14, {
    font: boldFont,
    color: COLORS.PRIMARY,
  });

  // Horizontal line under section title
  page.drawLine({
    start: { x: 40, y: paymentY - 10 },
    end: { x: 300, y: paymentY - 10 },
    thickness: 2,
    color: COLORS.LINE,
  });

  // Payment details
  addText("Bank Transfer:", 40, paymentY - 30, 10, { font: boldFont });
  addText("Bank MediFinance", 40, paymentY - 45, 10);
  addText("No. Rekening: 1234-5678-9012", 40, paymentY - 60, 10);
  addText("Atas Nama: PT Klinik MediConnect", 40, paymentY - 75, 10);

  // Add QR code placeholder
  page.drawRectangle({
    x: 400,
    y: paymentY - 100,
    width: 100,
    height: 100,
    color: COLORS.TEXT_SECONDARY,
    opacity: 0.1,
  });
  addText("QR Code", 435, paymentY - 45, 10, {
    color: COLORS.TEXT_SECONDARY,
    opacity: 0.6,
    align: "center",
  });
  addText("Pembayaran", 435, paymentY - 60, 10, {
    color: COLORS.TEXT_SECONDARY,
    opacity: 0.6,
    align: "center",
  });

  // Footer
  const footerY = 70;

  // Add decorative line at bottom
  page.drawRectangle({
    x: 0,
    y: footerY - 20,
    width: 612,
    height: 5,
    color: COLORS.PRIMARY,
    opacity: 0.8,
  });

  addText(
    "Terima kasih atas kunjungan Anda di Klinik MediConnect",
    306,
    footerY - 40,
    10,
    {
      color: COLORS.TEXT_SECONDARY,
      align: "center",
    }
  );

  addText(
    "Invoice ini sah dan diproses secara elektronik",
    306,
    footerY - 55,
    10,
    {
      color: COLORS.TEXT_SECONDARY,
      align: "center",
    }
  );

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

const handleDownloadInvoice = async (appointment, user) => {
  const pdfBytes = await generateInvoicePDF(appointment, user);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `invoice-${appointment.invoice}.pdf`;
  link.click();
};

export default handleDownloadInvoice;
