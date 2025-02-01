const nodemailer = require('nodemailer');
const twilio = require('twilio');

const validatePhoneNumber = (phone) => {
  // Regex to check if the phone number is in E.164 format
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phone);
};

const sendOTP = async (email, phone, otp) => {
  try {
    // Validate inputs
    if (!email && !phone) {
      throw new Error('Email or phone number is required to send OTP.');
    }

    if (!otp) {
      throw new Error('OTP is required.');
    }

    // Send OTP via Email
    if (email) {
      // Validate email configuration
      if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email configuration is missing in environment variables.');
      }

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // Use `true` for port 465, `false` for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);
      // console.log(`OTP sent to email: ${email}`);
    }

    // Send OTP via SMS using Twilio's messaging API
    if (phone) {
      // Validate phone number format
      if (!validatePhoneNumber(phone)) {
        throw new Error(`Invalid 'To' Phone Number: ${phone}. Phone number must be in E.164 format.`);
      }

      // Validate Twilio configuration
      if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
        throw new Error('Twilio configuration is missing in environment variables.');
      }

      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      await client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });

      // console.log(`OTP sent to phone: ${phone}`);
    }

    return { success: true, message: 'OTP sent successfully.' };
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    throw new Error(`Failed to send OTP: ${error.message}`);
  }
};

module.exports = sendOTP;