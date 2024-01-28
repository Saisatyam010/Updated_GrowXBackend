
const twt = require("jsonwebtoken")
const { isValidPassword } = require("../../GrowXUtils/GrowXUtils")
const nodemailer = require('nodemailer');
const { JWT_SECRET_KEY } = require("../../GrowXConstant/GrowXConstant")
const AdminModal = require("../../GrowXModals/GrowXAdminModals/GrowXAdminModals")




// Advertiser Auth 

exports.AdminLogin = async (req, res) => { 
try {
  const data = req.body
  console.log(data)
  const data_come = {
    email: data.email,
    password: data.password,
  }
  const ress = await AdminModal.findOne({ email:data_come.email })
  console.log(ress)
  if (ress) {
    const isValid = isValidPassword(data_come.password, ress.password)
    if (isValid) {
      const token = twt.sign({ id: ress._id }, JWT_SECRET_KEY)
      res.json({
        status: "success",
        message: "login sucessfully",
        data: ress,
        token: token
      })
    }
    else {
      res.json({
        status: "fail",
        message: "password is not correct",
      })
    }
  }
  else {
    res.json({
      status: "fail",
      message: "email is not correct",
    })
  }


}catch(error){
  
  const resError = {}
  resError.status = "failed"
  if (error.name === "ValidationError") {
    let errors = {};
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    resError.error = errors;
  }
  res.json(resError)


}
}

exports.AdminSignup = async (req, res) => {
try {
  const data = req.body
  const data_come = {
    fullName: data.fullName,
    email: data.email,
    password: data.password,
    company: data.company,
    country: data.country,
  }
  const ress = await AdminModal.create(data_come)
  res.json({
    status: "success",
    message: "signup sucessfully",
    data: ress
  })

}catch(error){
    
    const resError = {}
    resError.status = "failed"
    if (error.name === "ValidationError") {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
        });
        resError.error = errors;
    }
    res.json(resError)
}


}

// Function to send emails using SMTP
const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'akg76780@gmail.com', // Replace with your Gmail email
      pass: 'Quriload@7678', // Replace with your Gmail password or generate an app password
    },
  });

  const mailOptions = {
    from: 'akg76780@gmail.com', // Replace with your Gmail email
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

exports.ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await AdminModal.findOne({ email });

    if (!admin) {
      return res.json({
        status: 'fail',
        message: 'Admin with this email does not exist.',
      });
    }

    // Generate and save a password reset token
    admin.generatePasswordResetToken();
    await admin.save();

    // Send a password reset email to the admin
    const resetLink = `http://your-app-url/reset-password?token=${admin.passwordResetToken}`;
    const emailSubject = 'Password Reset Request';
    const emailHTML = `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`;

    await sendEmail(admin.email, emailSubject, emailHTML);

    res.json({
      status: 'success',
      message: 'Password reset email sent. Check your email for further instructions.',
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 'fail',
      message: 'An error occurred while processing your request.',
    });
  }
};