const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        requerid: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        requerid: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        requerid: [true, 'El contreseña es requerido']
    },
    img: {
        type: String,
        
    },
    rol: {
        type: String,
        requerid: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },
    
    google: {
        type: Boolean,
        default: false
    },

});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}
module.exports = model( 'Usuario', UsuarioSchema );