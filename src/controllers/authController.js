const authService = require('../services/authService');
const User = require('../models/User');

async function register(req, res, next) {
  console.log("Corpo da requisição:", req.body); // Linha adicionada

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
      return res.status(200).send('Login realizado com sucesso!');
    } else {
      return res.status(401).send('Senha incorreta.');
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
};
