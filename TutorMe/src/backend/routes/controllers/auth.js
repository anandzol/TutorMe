// routes/controllers/auth.js

const authService = require('../../services/authService');

const login = (req, res) => {
    authService.login(req, res);
};

const register = (req, res) => {
    authService.register(req, res);
};

const me = (req, res) => {
    authService.me(req, res);
};

const logout = (req, res) => {
    authService.logout(req, res);
};

module.exports = {
    login,
    register,
    logout,
    me
};
