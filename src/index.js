require('dotenv').config();
const express = require('express');
const app = express();
// route import
const userRouter = require('./routes/user');

app.use(express.json());

/**
 * login router
 */
app.use(userRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`'The application is listening on port ${process.env.PORT || 4000}`);
});
