const express = require('express');
const User = require('../models/User');
const auth = require ('../middleware/auth');
const { ResumeToken, MongoClient } = require('mongodb');
const { db } = require('../models/User');

const router = express.Router();

router.post('/users', async (req, res) => {
    //creamos un nuevo usuario
    try{
        const user = new User(req.body);
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({data: {nombre: user.usuario, contrasenya: user.password, token: token}});
    }catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.get('/users/all', async (req, res) => {
    res.send(await User.find({}).exec());
});

router.post('/users/login', async(req, res) => {
    //login de un usuario registrado
    try{
        const {usuario, password} = req.body;
        const user = await User.findByCredentials(usuario, password);
        if(!user){
            return res.status(401).send({error: 'Usuario o contraseña incorrecta'});
        }
        const token = await user.generateAuthToken();
        res.send({usuario, token});
    }catch (error) {
        res.status(400).send({error: 'Credenciales incorrectas'});
    }
})

router.get('/users/me', auth, async(req, res) => {
    //vemos el logeo del perfil del usuario
    res.send(req.user);
})

router.post('/users/me/logout', auth, async (req, res) => {
    //deslogueo del usuario
    try {
        ResumeToken.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send()
    }catch (error) {
        res.status(500).send(error);
    }
})

router.post('/users/me/logoutall', auth, async (req, res) =>{
    //deslogueo de todos los dispositivos
    try{
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send();
    }catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;