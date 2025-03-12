const User = require('../models/User');

exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.createUser = async (req, res) => {
    try {
        const { cpf, nome, email } = req.body;
        const user = new User({ cpf, nome, email });
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
        const { cpf, nome, email } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { cpf, nome, email }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário atualizado com sucesso', user });
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
