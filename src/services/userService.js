const User = require('../models/User');

exports.getUsers = async () => {
    return await User.find();
};

exports.createUser = async (cpf, nameComplete, email) => {
    const user = new User({ cpf, nameComplete, email });
    return await user.save();
};

exports.getUserByCpf = async (cpf) => {
    return await User.findOne({ cpf });
};

exports.updateUser = async (id, updatedData) => {
    return await User.findByIdAndUpdate(id, updatedData, { new: true });
};

exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};
