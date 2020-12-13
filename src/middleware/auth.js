const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({_id: data._id, 'tokens.token': token, 'permisos.permiso': permiso});
        if (!user) {
            throw new error();
        }
        req.user = user;
        req.token = token;
        req.permiso = permiso;
        next();
    }catch (error) {
        res.status(401).send({error: 'No estas autorizado para ese recurso'});
    }
}
module.exports = auth;