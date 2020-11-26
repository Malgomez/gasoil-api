const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./db/db');
const userRouter = require('./routers/user');
const port = process.env.PORT;
console.log(port)

const app = express();

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});