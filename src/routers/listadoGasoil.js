const express = require('express');
const ListadoGasoil = require('../models/ListadoGasoil');
const { MongoClient } = require('mongodb');
const { db } = require('../models/ListadoGasoil');
const fs = require("fs");

const router = express.Router();

router.post('/listado', async (req, res) => {
    try {
        req.body.csvLines.forEach(async (element) => {
            const listadoGasoil = new ListadoGasoil(element);
            await listadoGasoil.save();
        })
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
        res.status(200).send({data: "Lineas guardadas correctamente"});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.post('/csvFile', async (req, res) => {
    try{
        console.log(req.body)
        let fileName = req.body.fileName;
        req.body.csvLines.forEach(element => {
            let data = `${element.numerolinea};${element.deposito};${element.fecha};${element.hora};${element.matricula};${element.surtidor};${element.litros.replace(".", ",")}\n`;
            fs.appendFile(`/home/manuel/projects/gasoil-project/gasoil-api/src/files/${req.body.fileName}`, data, (err) => { 
                if (err) { 
                  console.log(err); 
                } 
            });
        });
        res.send(fileName);
    }catch(e){
        console.log(e);
        res.status(500).send(e)
    }
    
})

router.get('/csvFile/:fileName', async (req, res) => {
    try {
        res.download(`./src/files/${req.params.fileName}`);
    } catch (error) {
        res.status(500).send("Error interno en el servidor");
    }
})

router.delete('/csvFile/:fileName', async (req, res) => {
    try {
        fs.unlinkSync(`./src/files/${req.params.fileName}`);
        res.status(200).send({data: "Fichero eliminado"});
    } catch (error) {
        res.status(500).send("Error interno en el servidor");
    }
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