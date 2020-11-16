const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send({data: "Hola mundo"});
});

app.post('/login', (req, res) => {
    try{
        let user = req.body.user;
        let psw = req.body.psw;

        if(user === "root" && psw === "root"){
            res.status(200).send({data: `BIEEEEEEEN!!!`});
        }else{
            res.status(406).send({data: `MAAAAAAAAAAL!!!`});
        }
        
    }catch(e){
        res.status(500).send({error: "Error interno"})
    }
    
});

app.listen(9000, () => {
    console.log("App running on port 9000!!");
});