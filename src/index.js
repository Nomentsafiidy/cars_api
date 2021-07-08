require('dotenv').config();
const express = require('express');
const app = express();
// route import
const userRouter = require('./routes/user');
const carRouter = require('./routes/car');

app.use(express.json());

/**
 * login router
 */
app.use(userRouter);

/**
 * car router
 */
app.use(carRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`'The application is listening on port ${process.env.PORT || 4000}`);
});
