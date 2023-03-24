const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        // middelweres
        this.middelweres();
        
        // rutas de la aplicacion
        this.routes(); 

    } 

    middelweres() {
        
        //cors
        this.app.use( cors() );

        // Lecturea y parseo del body
        this.app.use( express.json());
        
        // Directorio publico
        this.app.use( express.static('public'));
    }

    routes() {
        
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.PORT, () => {
            console.log('Escuchando en el puerto: ', this.PORT);
        });
    }
}

module.exports = Server;