const sequelize = require('./sequelize');
const bcrypt = require('bcrypt');

module.exports = {

    postRegister: async (req, res) => {
        const { username, name, password } = req.body;
        const checkUser = await sequelize.query(`
        SELECT * FROM users WHERE username = '${username}'
        `);
        if (checkUser[1].rowCount !== 0) {
            res.status(500).send('Username already Exists')
        } else {
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);
            await sequelize.query(`
            INSERT INTO users(name, username, password)
            VALUES (
                '${name}',
                '${username}',
                '${passwordHash}'
            );
            `)
            const userInfo = await sequelize.query(`
            SELECT userId, username, name FROM users WHERE username = '${username}'
            `)
            res.status(200).send(userInfo)
        }
    },

    postLogin: async (req, res) => {
        const { username, password } = req.body;
        const validUser = await sequelize.query(`
        SELECT * FROM users WHERE username = '${username}'
        `)
        if (validUser[1].rowCount === 1) {
            if (bcrypt.compareSync(password, validUser[0][0].password)) {
                let object = {
                    userid: validUser[0][0].userid,
                    name: validUser[0][0].name,
                    username,
                }
                res.status(200).send(object);
            } else {
                res.status(401).send('Password is Incorrect');
            }
        } else {
            res.status(401).send('Username is Incorrect')
        }
    },

}
