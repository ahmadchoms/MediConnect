import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

const generateInvoicePDF = async (appointment) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const COLORS = {
    DARK_BLUE: rgb(0.1, 0.2, 0.5),
    GRAY: rgb(0.6, 0.6, 0.6),
    LIGHT_GRAY: rgb(0.95, 0.95, 0.95),
  };

  const addText = (text, x, y, size, options = {}) => {
    const {
      font: selectedFont = font,
      color = rgb(0, 0, 0),
      align = "left",
      maxWidth = undefined,
    } = options;

    page.drawText(text, {
      x,
      y,
      size,
      font: selectedFont,
      color,
      maxWidth,
      lineHeight: size * 1.2,
    });
  };

  page.drawRectangle({
    x: 50,
    y: 750,
    width: 500,
    height: 30,
    color: COLORS.DARK_BLUE,
  });

  addText("INVOICE JANJI TEMU", 60, 760, 16, {
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  addText(`Nomor Invoice: ${appointment.invoice}`, 350, 760, 10, {
    color: COLORS.GRAY,
  });

  addText("Klinik MediConnect", 50, 720, 12, { font: boldFont });
  addText("Jl. Kesehatan No. 123", 50, 700, 10, { color: COLORS.GRAY });
  addText("Jakarta, Indonesia", 50, 685, 10, { color: COLORS.GRAY });

  page.drawRectangle({
    x: 50,
    y: 630,
    width: 500,
    height: 40,
    color: COLORS.LIGHT_GRAY,
    opacity: 0.5,
  });

  addText("Detail Janji Temu", 50, 580, 14, {
    font: boldFont,
    color: COLORS.DARK_BLUE,
  });
  addText(`Dokter: ${appointment.doctor}`, 50, 560, 12);
  addText(`Spesialis: ${appointment.specialty}`, 50, 540, 12);
  addText(`Tanggal: ${appointment.date}`, 50, 520, 12);
  addText(`Waktu: ${appointment.time}`, 50, 500, 12);
  addText(`Alasan Kunjungan: ${appointment.reason}`, 50, 480, 12);
  addText(`Biaya Dokter: ${appointment.appointmentFee}`, 50, 480, 12);

  addText("Rincian Biaya", 50, 430, 14, {
    font: boldFont,
    color: COLORS.DARK_BLUE,
  });

  const costs = [
    {
      description: "Biaya Penanganan",
      amount: appointment.handlingFee || 0,
    },
    { description: "Biaya Obat", amount: appointment.medicationFee || 0 },
  ];

  let yPosition = 400;
  costs.forEach((cost) => {
    addText(cost.description, 50, yPosition, 10);
    addText(`Rp ${cost.amount.toLocaleString()}`, 400, yPosition, 10);
    yPosition -= 20;
  });

  const totalFee = costs.reduce((sum, cost) => sum + cost.amount, 0);
  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: 550, y: yPosition },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  addText("Total Biaya", 50, yPosition - 30, 12, { font: boldFont });
  addText(`Rp ${totalFee.toLocaleString()}`, 400, yPosition - 30, 12, {
    font: boldFont,
  });

  addText("Terima kasih atas kunjungan Anda.", 50, 100, 10, {
    color: COLORS.GRAY,
  });
  addText("Invoice ini sah dan diproses secara elektronik.", 50, 80, 10, {
    color: COLORS.GRAY,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

const handleDownloadInvoice = async (appointment) => {
  const pdfBytes = await generateInvoicePDF(appointment);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `invoice-${appointment.invoice}.pdf`;
  link.click();
};

export default handleDownloadInvoice;
