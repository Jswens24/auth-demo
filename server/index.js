const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
const sequelize = require('./sequelize');

app.use(express.json());
app.use(cors());

const ctrlr = require('./controller');

sequelize.authenticate().then(() => {
    app.set('db', {
        sequelize,
    });

    //end points
    app.post('/register', ctrlr.postRegister);
    app.post('/login', ctrlr.postLogin)





})






app.listen(PORT, () => console.log(`Server running on port ${PORT}`));