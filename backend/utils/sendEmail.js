const nodemailer = require('nodemailer')

const sendEmailVerification = async (firstname, email, verificationLink)=> {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_AUTH_USER,
                pass: process.env.NODEMAILER_AUTH_PASS
            }
        })

        const body = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 600px;
                        max-width: 100%;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    h1 {
                        color: #333333;
                    }
                    p {
                        color: #555555;
                        line-height: 1.5;
                    }
                    a {
                        display: inline-block;
                        background-color: #4CAF50;
                        color: #ffffff;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Hello ${firstname}</p>
                    <p>Thank you for registering with us. Please verify your email address by clicking the button below:</p>
                    <p><a href="${verificationLink}">Verify Email</a></p>
                    <p>If you did not create an account with us, please ignore this email.</p>
                    <p>Best regards,<br>Ecommerce Shop</p>
                </div>
            </body>
            </html>
        `

        const mailOptions = {
            from: `"Ecommerce Shop" <chineducode@gmail.com>`,
            to: email,
            subject: `Email Verification`,
            text: `
                Hi ${firstname},
                Thank you for registering with us. Please click the link below to verify your email address.
                https://afribooth.vercel.app/email-verification

                If you did not request this, please ignore this email.
            `,
            html: body
        }
        
        await transporter.sendMail(mailOptions);

    } catch (error) {
        throw new Error(error.message)
    }
}

const successEmailVerification = async (firstname, email, loginLink)=> {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_AUTH_USER,
                pass: process.env.NODEMAILER_AUTH_PASS
            }
        })
    
        const body = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verified Successfully</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 600px;
                        max-width: 100%;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    h1 {
                        color: #333333;
                    }
                    p {
                        color: #555555;
                        line-height: 1.5;
                    }
                    a {
                        display: inline-block;
                        background-color: #4CAF50;
                        color: #ffffff;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Hello ${firstname},</p>
                    <p>Your email address has been successfully verified. You can now access all the features of our platform.</p>
                    <p><a href="${loginLink}">Login to Your Account</a></p>
                    <p>If you did not verify your email, please contact our support team.</p>
                    <p>Best regards,<br>Ecommerce Shop</p>
                </div>
            </body>
            </html>
        `
    
        const mailOptions = {
            from: `"Ecommerce Shop" <chineducode@gmail.com>`,
            to: email,
            subject: `Email Verified Successfully`,
            text: `
                Hello ${firstname},
                Your email address has been successfully verified. You can now access all the features of our platform.
                <a href="${loginLink}">Login to Your Account</a>
                If you did not verify your email, please contact our support team.
                Best regards,<br>Ecommerce Shop
            `,
            html: body
        }
    
        await transporter.sendMail(mailOptions);
        
    } catch (error) {
        throw new Error(error.message)
    }
}

const sendOTP = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_AUTH_USER,
                pass: process.env.NODEMAILER_AUTH_PASS
            }
        })

        const body = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your OTP Code</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 600px;
                        max-width: 100%;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    h1 {
                        color: #333333;
                    }
                    p {
                        color: #555555;
                        line-height: 1.5;
                    }
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        color: #4CAF50;
                        background-color: #e0f7fa;
                        padding: 10px;
                        border-radius: 5px;
                        text-align: center;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Hello,</p>
                    <p>Your One-Time Password (OTP) for verifying your account is:</p>
                    <div class="otp">${otp}</div>
                    <p>This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
                    <p>If you did not request this OTP, please ignore this email.</p>
                    <p>Best regards,<br>Ecommerce Shop</p>
                </div>
            </body>
            </html>
        `

        const mailOptions = {
            from: `"Ecommerce Shop" <chineducode@gmail.com>`,
            to: email,
            subject: `Your OTP Code`,
            text: `
                Hello,
                Your One-Time Password (OTP) for verifying your account is:
                ${otp}
                This OTP is valid for 10 minutes. Please do not share this code with anyone.
                If you did not request this OTP, please ignore this email.
                Best regards,
                Ecommerce Shop
            `,
            html: body
        }
        
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error(error.message)
        throw new Error(error.message)
    }
}

const passwordReset = async (email, resetLink) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_AUTH_USER,
                pass: process.env.NODEMAILER_AUTH_PASS
            }
        })

        const body = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset Request</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 600px;
                        max-width: 100%;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 5px;
                    }
                    h1 {
                        color: #333333;
                    }
                    p {
                        color: #555555;
                        line-height: 1.5;
                    }
                    a {
                        display: inline-block;
                        background-color: #4CAF50;
                        color: #ffffff;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Hello,</p>
                    <p>We received a request to reset your password. If you did not request a password reset, please ignore this email.</p>
                    <p>If you wish to reset your password, click the button below:</p>
                    <p><a href="${resetLink}">Reset Password</a></p>
                    <p>This link is valid for 15 minutes. Please do not share this link with anyone.</p>
                    <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
                    <p>Best regards,<br>Ecommerce Shop</p>
                </div>
            </body>
            </html>
        `

        const mailOptions = {
            from: `"Ecommerce Shop" <chineducode@gmail.com>`,
            to: email,
            subject: `Password Reset Request`,
            text: `
                Hello,
                We received a request to reset your password. If you did not request a password reset, please ignore this email.
                If you wish to reset your password, click the button below:
                ${resetLink}
                This link is valid for 15 minutes. Please do not share this link with anyone.
                If you have any questions or need further assistance, feel free to contact our support team.
                Best regards,
                Ecommerce Shop
            `,
            html: body
        }

        await transporter.sendMail(mailOptions)

    } catch (error) {
        throw new Error(error.message)
    }
}

const successPasswordReset = async (email, firstname) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_AUTH_USER,
                pass: process.env.NODEMAILER_AUTH_PASS
            }
        })
    
        const body = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Updated Successfully</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 600px;
                        max-width: 100%;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        background-color: #4CAF50;
                        color: #ffffff;
                        padding: 10px;
                        border-radius: 5px 5px 0 0;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 20px;
                        text-align: center;
                    }
                    .content p {
                        font-size: 16px;
                        line-height: 1.5;
                        color: #333333;
                    }
                    .content .message {
                        font-weight: bold;
                        color: #4CAF50;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px;
                        background-color: #f4f4f4;
                        border-radius: 0 0 5px 5px;
                        font-size: 14px;
                        color: #666666;
                    }
                    .footer a {
                        color: #4CAF50;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="content">
                        <p>Hello ${firstname},</p>
                        <p>We wanted to inform you that your password has been successfully updated.</p>
                        <p class="message">If you did not make this change, please contact our support team immediately.</p>
                        <p>Thank you for keeping your account secure!</p>
                    </div>
                    <div class="footer">
                        <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
                        <p>&copy; 2024 Ecommerce Shop. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `

        const mailOptions = {
            from: `"Ecommerce Shop" <chineducode@gmail.com>`,
            to: email,
            subject: 'Password Updated Successfully',
            text: `
                Hello ${firstname},
                We wanted to inform you that your password has been successfully updated.
                If you did not make this change, please contact our support team immediately.
                Thank you for keeping your account secure! 

                If you have any questions, feel free to <a href="mailto:support@example.com">contact us</a>.
                &copy; 2024 Ecommerce Shop. All rights reserved.
            `,
            html: body
        }
        
        await transporter.sendMail(mailOptions)

    } catch (error) {
        throw new error(error)
    }
}

module.exports = {
    sendEmailVerification,
    sendOTP,
    successEmailVerification,
    passwordReset,
    successPasswordReset
}
