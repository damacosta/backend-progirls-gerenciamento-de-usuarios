const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado, token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Token inválido: ' + error.message });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expirado: ' + error.message });
        } else {
            return res.status(401).json({ error: 'Erro de autenticação: ' + error.message });
        }
    }
};

module.exports = authMiddleware;