const mongoose = require('mongoose');
const { mongobd } = require('../config');

const dbConnection = async() => {

    try {
        await mongoose.connect(mongobd, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('bd online!!');
    }catch (err) {
        console.log(err);
        throw new Error('Error en la base de datos');
    }

}

module.exports = {
    dbConnection
}