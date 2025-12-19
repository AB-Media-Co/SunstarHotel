import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (booking) => {
    const doc = new jsPDF();

    // Hotel Info
    const hotelName = booking.hotelInfo?.name || "Sunstar Hotel";
    const hotelAddress = booking.hotelInfo?.cityLocation?.name || "";

    // Set font styles - Header
    doc.setFontSize(22);
    doc.setTextColor(5, 143, 162); // Sunstar Teal color
    doc.text(hotelName.toUpperCase(), 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(hotelAddress, 14, 26);
    doc.text("Email: booking@sunstarhospitality.com", 14, 31);
    doc.text("Phone: +91-9310831646", 14, 36);

    // Invoice Title Block
    doc.setFontSize(24);
    doc.setTextColor(200);
    doc.text("INVOICE", 140, 25);

    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`Reservation No: ${booking.ReservationNo}`, 140, 31);
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 140, 36);
    doc.text(`Payment Status: ${booking.TransactionStatus || 'Paid'}`, 140, 41);

    // Divider
    doc.setDrawColor(220);
    doc.setLineWidth(0.5);
    doc.line(14, 48, 196, 48);

    // Bill To
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text("Bill To:", 14, 58);

    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`Guest Name: ${booking.GuestName}`, 14, 65);
    doc.text(`Email: ${booking.Email}`, 14, 70);
    doc.text(`Mobile: ${booking.Mobile}`, 14, 75);

    // Booking Details Table
    // Calculate approx rate per night if not separate
    const ratePerNight = (parseFloat(booking.TotalInclusiveTax) / parseInt(booking.NoOfNights || 1)).toFixed(2);
    const totalAmountVal = parseFloat(booking.TotalInclusiveTax);

    // Helper for currency - standard jsPDF fonts don't support Indian Rupee symbol well
    // Using "INR" code instead to avoid garbage characters
    const formatMoney = (val) => `INR ${parseFloat(val).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const tableData = [
        [
            `${booking.Room} (${booking.RoomNo || 'Assigned at Check-in'})`,
            `${new Date(booking.ArrivalDate).toLocaleDateString()} - ${new Date(booking.DepartureDate).toLocaleDateString()}`,
            booking.NoOfNights,
            formatMoney(ratePerNight),
            formatMoney(totalAmountVal)
        ]
    ];

    autoTable(doc, {
        startY: 85,
        head: [['Description', 'Dates', 'Nights', 'Rate', 'Amount']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [5, 143, 162], textColor: 255, halign: 'center' },
        columnStyles: {
            0: { cellWidth: 80, valign: 'middle' },
            1: { halign: 'center', valign: 'middle' },
            2: { halign: 'center', valign: 'middle' },
            3: { halign: 'right', valign: 'middle' },
            4: { halign: 'right', valign: 'middle' }
        },
        styles: { fontSize: 10, cellPadding: 6 }
    });

    // Total Section
    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Total Amount:`, 140, finalY);
    doc.setFontSize(14);
    doc.setTextColor(5, 143, 162);
    doc.text(formatMoney(totalAmountVal), 196, finalY, { align: 'right' });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Thank you for choosing Sunstar!", 105, 280, { align: 'center' });
    doc.text("For support, contact booking@sunstarhospitality.com", 105, 285, { align: 'center' });

    // Save the PDF
    doc.save(`Invoice_${booking.ReservationNo}.pdf`);
};
