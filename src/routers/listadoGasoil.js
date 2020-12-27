const express = require('express');
const ListadoGasoil = require('../models/ListadoGasoil');
const auth = require('../middleware/auth');
const { MongoClient } = require('mongodb');
const { db } = require('../models/ListadoGasoil');

const router = express.Router();

router.post('/listado', async (req, res) => {
    try {
        const listadoGasoil = new ListadoGasoil(req.body);
        listadoGasoil.litros = req.body.litros.replace(',', '.');
        await listadoGasoil.save();
        res.status(201).send({
            data: {
                delegacion: listadoGasoil.delegacion,
                numerolinea: listadoGasoil.numerolinea, 
                deposito: listadoGasoil.deposito,
                fecha: listadoGasoil.fecha,
                hora: listadoGasoil.hora, 
                matricula: listadoGasoil.matricula,
                surtidor: listadoGasoil.surtidor, 
                litros: listadoGasoil.litros
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get('listado/guardarArchivo', async (body, res) => {
    //document.write(body);
    console.log(body);
    res.sendFile({body}).exec();
})
router.get('/listado/findByDelegacion', async (body, res) => {
    res.send(await ListadoGasoil.find({ delegacion: delegacion }).exec());
})

router.get('/listado/findByFecha', async (body, res) => {
    res.send(await ListadoGasoil.find({ fecha: body }).exec());
})

router.get('listado/findByMatricula', async (body, res) => {
    res.send(await ListadoGasoil.find({ matricula: body }).exec());
})

module.exports = router;