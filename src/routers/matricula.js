const express = require('express');
const Matricula = require('../models/Matricula');
const {MongoClient} = require('mongodb');
const {db} = require('../models/Matricula');

const router = express.Router();

router.post('/matricula', async (req, res) => {
    try{
        const matricula = new Matricula(req.body);
        await matricula.save();
        res.status(201).send({data: {delegacion: matricula.delegacion, matricula: matricula.matricula}});
    }catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.get('/matricula/all', async (req, res) => {
    res.send(await Matricula.find({}).exec());
});

router.get('/matricula/findByMatricula', async (body, res) => {
    res.send(await Matricula.find({matricula: body}).exec());
})

router.get('matricula/findByDelegacion', async (body, res) => {
    res.send(await Matricula.find({delegacion: body}).exec());
});

module.exports = router;