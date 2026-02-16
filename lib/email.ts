import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
    },
});

/**
 * Send approval email to student
 * @param email - Student's email address
 * @param name - Student's name
 */
export async function sendApprovalEmail(email: string, name: string): Promise<void> {
    try {
        const mailOptions = {
            from: `"CampusHire" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🎉 Your CampusHire Account Has Been Approved!',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
            .button { display: inline-block; background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            ul { padding-left: 20px; }
            li { margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎓 Welcome to CampusHire!</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              
              <p>Great news! Your account has been <strong>approved</strong> by the admin.</p>
              
              <p>You can now access all features of CampusHire:</p>
              <ul>
                <li>✅ Browse available job opportunities</li>
                <li>✅ Apply to jobs that match your profile</li>
                <li>✅ Track your applications in real-time</li>
                <li>✅ Update your profile anytime</li>
              </ul>
              
              <p>Get started by logging into your dashboard:</p>
              
              <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/students/dashboard" class="button">
                Go to Dashboard →
              </a>
              
              <p style="margin-top: 30px;">If you have any questions, feel free to reach out to your college admin.</p>
              
              <p>Best regards,<br/>
              <strong>The CampusHire Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `,
            text: `Hi ${name},\n\nGreat news! Your CampusHire account has been approved.\n\nYou can now:\n- Browse job opportunities\n- Apply to jobs\n- Track applications\n- Update your profile\n\nLogin at: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/students/dashboard\n\nBest regards,\nThe CampusHire Team`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Approval email sent successfully to: ${email}`);
    } catch (error) {
        console.error('❌ Error sending approval email:', error);
        throw error;
    }
}

/**
 * Send rejection email to student
 * @param email - Student's email address
 * @param name - Student's name
 */
export async function sendRejectionEmail(email: string, name: string): Promise<void> {
    try {
        const mailOptions = {
            from: `"CampusHire" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Update on Your CampusHire Application',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Application Status Update</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              
              <p>We regret to inform you that your CampusHire application has been rejected by the admin.</p>
              
              <p>If you believe this is an error or need more information, please contact your college administration.</p>
              
              <p>Best regards,<br/>
              <strong>The CampusHire Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `,
            text: `Hi ${name},\n\nWe regret to inform you that your CampusHire application has been rejected.\n\nPlease contact your college administration for more information.\n\nBest regards,\nThe CampusHire Team`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Rejection email sent successfully to: ${email}`);
    } catch (error) {
        console.error('❌ Error sending rejection email:', error);
        throw error;
    }
}

/**
 * Send profile completion notification to admin
 * @param adminEmail - Admin's email address
 * @param studentName - Student's name
 * @param studentEmail - Student's email
 */
export async function sendNewStudentNotification(
    adminEmail: string,
    studentName: string,
    studentEmail: string
): Promise<void> {
    try {
        const mailOptions = {
            from: `"CampusHire" <${process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: '🔔 New Student Profile Awaiting Approval',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
            .button { display: inline-block; background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .info-box { background: #f3f4f6; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📋 New Student Registration</h1>
            </div>
            <div class="content">
              <p>Hello Admin,</p>
              
              <p>A new student has completed their profile and is waiting for approval.</p>
              
              <div class="info-box">
                <p style="margin: 5px 0;"><strong>Student Name:</strong> ${studentName}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${studentEmail}</p>
              </div>
              
              <p>Please review and approve/reject this student from your admin dashboard.</p>
              
              <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/dashboard/students" class="button">
                Review Student →
              </a>
              
              <p style="margin-top: 30px;">Best regards,<br/>
              <strong>CampusHire System</strong></p>
            </div>
          </div>
        </body>
        </html>
      `,
            text: `New Student Registration\n\nStudent Name: ${studentName}\nEmail: ${studentEmail}\n\nPlease review and approve/reject from your admin dashboard.\n\nLogin at: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/dashboard/students`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Admin notification sent successfully to: ${adminEmail}`);
    } catch (error) {
        console.error('❌ Error sending admin notification:', error);
        throw error;
    }
}

/**
 * Send invitation email to recruiter
 * @param email - Recruiter's email address
 * @param companyName - Company name
 * @param inviteLink - Invitation link
 */
export async function sendRecruiterInviteEmail(
    email: string,
    companyName: string,
    inviteLink: string
): Promise<void> {
    try {
        const mailOptions = {
            from: `"CampusHire" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🎓 You have been invited to join CampusHire',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
            .button { display: inline-block; background-color: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Invitation to Join CampusHire</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              
              <p>You have been invited to join <strong>CampusHire</strong> as a recruiter for <strong>${companyName}</strong>.</p>
              
              <p>CampusHire helps you connect with top talent from our college. By joining, you can:</p>
              <ul>
                <li>Post job openings</li>
                <li>Review student applications</li>
                <li>Shortlist candidates</li>
              </ul>
              
              <p>Click the button below to accept the invitation and set up your account:</p>
              
              <a href="${inviteLink}" class="button">
                Accept Invitation →
              </a>
              
              <p style="margin-top: 20px; font-size: 14px; color: #666;">
                Or copy this link to your browser: <br>
                <a href="${inviteLink}">${inviteLink}</a>
              </p>
              
              <p style="margin-top: 30px;">Best regards,<br/>
              <strong>The CampusHire Team</strong></p>
            </div>
            <div class="footer">
              <p>This invitation expires in 7 days.</p>
            </div>
          </div>
        </body>
        </html>
      `,
            text: `Hello,\n\nYou have been invited to join CampusHire as a recruiter for ${companyName}.\n\nClick here to accept: ${inviteLink}\n\nBest regards,\nThe CampusHire Team`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Recruiter invite email sent successfully to: ${email}`);
    } catch (error) {
        console.error('❌ Error sending recruiter invite email:', error);
        throw error;
    }
}
