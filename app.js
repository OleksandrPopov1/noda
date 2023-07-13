const express = require('express');
require('dotenv').config();

const {PORT} = require("./configs/config");
const {userRouter} = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);


app.listen(PORT, () => {
    console.log(PORT);
});
