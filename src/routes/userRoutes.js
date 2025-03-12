const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/users', async (req, res) => {
    try {
        const { cpf, name, email, password, birthDate, phone, admissionDate } = req.body;

        const existingUser  = await User.findOne({ cpf });
        if (existingUser ) {
            return res.status(409).json({ error: 'CPF já cadastrado' });
        }

        if (!cpf || !name || !email || !password || !birthDate || !phone || !admissionDate) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const user = new User({ cpf, name, email, password, birthDate, phone, admissionDate });
        await user.save();
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/users/:cpf', async (req, res) => {
    try {
        const { cpf } = req.params;
        const user = await User.findOne({ cpf });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser  = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedUser ) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(updatedUser );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser  = await User.findByIdAndDelete(id);
        if (!deletedUser ) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;