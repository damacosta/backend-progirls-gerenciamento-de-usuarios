const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    cpf: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    situation: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
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
        minlength: [6, 'Password must be at least 6 characters'],
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
