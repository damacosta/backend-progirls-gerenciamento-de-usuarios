const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    id: {
        type: Number, 
        unique: true 
    },
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
        minlength: [6, 'A senha deve ter pelo menos 6 caracteres'],
    }
}, {
    timestamps: true,
});

userSchema.plugin(AutoIncrement, { inc_field: 'id' });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
