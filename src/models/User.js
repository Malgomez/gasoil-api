const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    permiso: {
        type: String,
        required: true 
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    //Hash a la contrasena antes de generar el usuario
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    //generamos el token para el usuario
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (usuario, password) => {
    //busqueda del usuario y la contrasena
    const user = await User.findOne({ usuario});
    if (!user) {
        throw new Error({error: 'Credenciales Invalidadas'});
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({error: 'Credenciales Invalidas'});
    }
    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;