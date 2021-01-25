const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./db/db');
const userRouter = require('./routers/user');
const gasoilRouter = require('./routers/listadoGasoil');
const matriculaRouter = require('./routers/matricula');
const port = process.env.PORT;
console.log(port)

const app = express();

var cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(userRouter);
app.use(gasoilRouter);
app.use(matriculaRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});