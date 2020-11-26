const express = require('express');
const User = require('../models/User');
const auth = require ('../middleware/auth')

const router = express.Router();

router.post('/users', async (req, res) => {
    //creamos un nuevo usuario
    try{
        const user = new User(req.body);
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token});
    }catch (error) {
        res.status(400).send(error);
    }
})

router.post('/users/login', async(req, res) => {
    //login de un usuario registrado
    try{
        const {email, password} = req.body;
        const user = await User.findByCredentials(email, password);
        if(!user){
            return res.status(401).send({error: 'Usuario o contraseña incorrecta'});
        }
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch (error) {
        res.status(400).setDefaultEncoding(error);
    }
})

router.get('/users/me', auth, async(req, res) => {
    //vemos el logeo del perfil del usuario
    res.send(req.user);
})

module.exports = router;