const mongoose = require('mongoose');
const User = require('./src/models/User');
const authService = require('./src/services/authService');
const dotenv = require('dotenv');

dotenv.config();

async function migratePasswords() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao banco de dados.');

    const users = await User.find({});
    for (const user of users) {
      if (user.password && !user.password.startsWith('$2b$')) {
        const hashedPassword = await authService.hashPassword(user.password);
        user.password = hashedPassword;
        await user.save();
        console.log(`Senha do usuário ${user.email} criptografada.`);
      }
    }
    console.log('Migração de senhas concluída.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Erro na migração de senhas:', error);
    mongoose.disconnect();
  }
}

migratePasswords();