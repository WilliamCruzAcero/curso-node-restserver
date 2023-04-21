const express = require('express');
const cors = require('cors');
const { conectDB } = require('../database/config_DB');


class Server {

    constructor() {
        this.app = express(); 
        this.PORT = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        // conectar base de datos
        this.conectarDB();
        // rutas de la aplicacion
        this.middelweres();
        // middelweres
        this.routes(); 

    } 

     async conectarDB() {
        await conectDB();
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