exports.login = (req, res) => {
    const { username, password } = req.body;

    if (username === 'usuario' && password === 'senha') {
        return res.status(200).json({ message: 'Login bem-sucedido!' });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
};

exports.recoverPassword = (req, res) => {
    const { email } = req.body;

    return res.status(200).json({ message: 'Instruções para redefinir a senha foram enviadas para o seu e-mail.' });
};