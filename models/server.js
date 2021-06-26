const express = require('express');
const {dbConnection} = require('../database/config');
const { port } = require('../config');
const cors = require('cors')

class Server {
    
    constructor(){
        this.app = express();
        this.pathRoutes = '/api/v1'
        this.connectBd();
        this.middlewares();
        this.routes();
    }

    async connectBd(){
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(`${this.pathRoutes}/employee`, require('../routes/employee'));
    }

    listen() {
        this.app.listen(port, ()=> {
            console.log('Servidor corriendo en puerto', port);
        })
    }
}

module.exports = Server;