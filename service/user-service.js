const config = require('../config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;
const UserLogin = db.UserLogin


module.exports = {
    authenticate,
    create,
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role}, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}



async function create(userParam) {
    
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save();
}