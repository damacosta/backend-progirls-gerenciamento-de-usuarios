const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    cpf: {
        type: String,
        required: true,
        trim: true,
    },
    nameComplete: {
        type: String,
        required: true,
        trim: true,
    },
    situation: {
        type: String,
        enum: ['Ativo', 'Inativo'],
        default: 'Ativo',
    },
    birthDate: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    admissionDate: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'A senha deve ter pelo menos 6 caracteres'],
    }
}, {
    timestamps: true,
});

userSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('User', userSchema);

module.exports = User;
