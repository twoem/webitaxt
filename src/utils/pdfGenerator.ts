import jsPDF from 'jspdf';

interface FormData {
  firstName: string;
  kraPin: string;
  kraPassword: string;
  email: string;
  emailPassword: string;
}

export const generatePDF = async (data: FormData): Promise<void> => {
  const doc = new jsPDF();
  
  // Page setup
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Professional color palette
  const colors = {
    primary: [41, 98, 255],      // Professional blue
    secondary: [16, 185, 129],    // Success green
    dark: [31, 41, 55],          // Dark gray
    medium: [75, 85, 99],        // Medium gray
    light: [243, 244, 246],      // Light gray
    warning: [245, 158, 11],     // Warning amber
    warningBg: [255, 251, 235],  // Warning background
    white: [255, 255, 255]
  };

  // HEADER SECTION - Compact professional header
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  // Company logo circle - smaller
  doc.setFillColor(...colors.white);
  doc.circle(30, 25, 12, 'F');
  
  // Logo text
  doc.setTextColor(...colors.primary);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('T', 27, 29);
  
  // Company name - compact
  doc.setTextColor(...colors.white);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Twoem Online Productions', 50, 22);
  
  // Services tagline
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Dealers in: High Speed internet and cyber services', 50, 32);

  // MAIN CONTENT AREA
  let currentY = 70;
  
  // Document title - compact
  doc.setTextColor(...colors.dark);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('I-Tax Account Credentials', margin, currentY);
  
  currentY += 20;
  
  // Personal greeting
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...colors.dark);
  doc.text(`Hello, ${data.firstName}`, margin, currentY);
  
  currentY += 15;
  
  // Account creation message - compact
  doc.setFontSize(10);
  doc.setTextColor(...colors.medium);
  const welcomeMsg = 'Your I-Tax account is well created and the following are your login credentials:';
  const msgLines = doc.splitTextToSize(welcomeMsg, contentWidth);
  doc.text(msgLines, margin, currentY);
  
  currentY += 20;
  
  // I-TAX DETAILS SECTION - Minimized
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, currentY - 3, contentWidth, 35, 2, 2, 'F');
  
  doc.setDrawColor(...colors.primary);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY - 3, contentWidth, 35, 2, 2, 'S');
  
  // Section header - compact
  doc.setTextColor(...colors.primary);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('📋 I-Tax Details', margin + 5, currentY + 8);
  
  currentY += 18;
  
  // KRA PIN - single line, compact
  doc.setTextColor(...colors.dark);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('KRA PIN:', margin + 8, currentY);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(data.kraPin, margin + 45, currentY);
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.dark);
  doc.text('Password:', margin + 100, currentY);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(data.kraPassword, margin + 135, currentY);
  
  currentY += 25;
  
  // EMAIL DETAILS SECTION - Minimized
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, currentY - 3, contentWidth, 35, 2, 2, 'F');
  
  doc.setDrawColor(...colors.secondary);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY - 3, contentWidth, 35, 2, 2, 'S');
  
  // Section header - compact
  doc.setTextColor(...colors.secondary);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('📧 Email Details', margin + 5, currentY + 8);
  
  currentY += 18;
  
  // Email details - single line, compact
  doc.setTextColor(...colors.dark);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Email:', margin + 8, currentY);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(data.email, margin + 35, currentY);
  
  currentY += 12;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.dark);
  doc.text('Password:', margin + 8, currentY);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(data.emailPassword, margin + 50, currentY);
  
  currentY += 25;
  
  // IMPORTANT NOTICE SECTION - Compact but prominent
  doc.setFillColor(...colors.warningBg);
  doc.roundedRect(margin, currentY - 3, contentWidth, 30, 2, 2, 'F');
  
  doc.setDrawColor(...colors.warning);
  doc.setLineWidth(1);
  doc.roundedRect(margin, currentY - 3, contentWidth, 30, 2, 2, 'S');
  
  // Notice header with icon
  doc.setTextColor(146, 64, 14);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('⚠️ Important Notice:', margin + 5, currentY + 8);
  
  // Notice text - compact
  doc.setTextColor(120, 53, 15);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const noticeText = 'Please add a recovery phone number to the email to avoid losing it. Retrieval of an email will take 3 days and cost 300/=';
  const noticeLines = doc.splitTextToSize(noticeText, contentWidth - 10);
  doc.text(noticeLines, margin + 5, currentY + 18);
  
  // FOOTER SECTION - Compact
  const footerY = pageHeight - 25;
  
  doc.setFillColor(...colors.dark);
  doc.rect(0, footerY, pageWidth, 25, 'F');
  
  doc.setTextColor(...colors.white);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  
  // Location
  doc.text('📍 Kagwe Town, Plaza Building 1st floor next to the Total Petrol Station', margin, footerY + 8);
  
  // Copyright
  const currentYear = new Date().getFullYear();
  doc.setFontSize(7);
  doc.setTextColor(156, 163, 175);
  doc.text(`© ${currentYear} Twoem Online Productions. All rights reserved.`, margin, footerY + 18);
  
  // Generate filename
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = `${data.firstName}_ITax_Credentials_${timestamp}.pdf`;
  
  // Save the PDF
  doc.save(fileName);
};