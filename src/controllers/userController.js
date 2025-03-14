const User = require('../models/User');
const authService = require('./services/authService');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.createUser = async (req, res) => {
    try {
      const { cpf, nameComplete, email, password, birthDate, phone, admissionDate } = req.body;
      const hashedPassword = await authService.hashPassword(password);
      const user = new User({ cpf, nameComplete, email, password: hashedPassword, birthDate, phone, admissionDate });
      await user.save();
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

exports.getUserByCpf = async (req, res) => {
  const user = await User.findOne({ cpf: req.params.cpf });
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.json(user);
};

exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { password, ...otherFields } = req.body;
  
      if (password) {
        const hashedPassword = await authService.hashPassword(password);
        const updatedUser = await User.findByIdAndUpdate(id, { password: hashedPassword, ...otherFields }, { new: true, runValidators: true });
        if (!updatedUser) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(updatedUser);
      } else {
        const updatedUser = await User.findByIdAndUpdate(id, otherFields, { new: true, runValidators: true });
        if (!updatedUser) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(updatedUser);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.json({ message: 'Usuário excluído com sucesso' });
};