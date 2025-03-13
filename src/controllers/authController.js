const authService = require('../services/authService');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

async function register(req, res, next) {
  console.log("Request Body:", req.body);

  try {
    const { cpf, nameComplete, situation, birthDate, email, phone, admissionDate, password } = req.body;
    const hashedPassword = await authService.hashPassword(password);
    const user = new User({ cpf, nameComplete, situation, birthDate, email, phone, admissionDate, password: hashedPassword });
    await user.save();
    res.status(201).send('Usuário registrado com sucesso!');
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Usuário não encontrado.');
    }
    const passwordMatch = await authService.comparePasswords(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login realizado com sucesso!', token: token });
  
    } else {
      return res.status(401).send('Senha incorreta.');
    }
  } catch (error) {
    next(error);
  }
}

async function recovery(req, res, next) {
  const { cpf, email } = req.body;
  try {
    const user = await User.findOne({ cpf, email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const newPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: user.email,
      subject: 'Recuperação de Senha',
      ext: `Sua nova senha é: ${newPassword}`,
      html: `<p>Sua nova senha é: <b>${newPassword}</b></p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Nova senha enviada para o e-mail' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  recovery,
};
