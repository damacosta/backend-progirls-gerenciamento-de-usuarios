const mongoose = require('mongoose');

//Definindo esquema do usuário
const userSchema = new mongoose.Schema({
    name: {
        type: String; 
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'A senha deve ter pelo menos 6 caracteres']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

    //Criando o modelo de usuário
    const User = mongoose.modelo('User', userSchema);

    module.exports = User;
})