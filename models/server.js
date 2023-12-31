const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../database/config');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';

        // conectar a DB
        this.connectarDB();

        // Middlewares
        this.middlewares();

        this.routes();
    }

    async connectarDB() {
        await dbConnection();
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());        

        // diectorio Publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;