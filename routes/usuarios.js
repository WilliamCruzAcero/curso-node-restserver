const {check} = require('express-validator');


const {Router}  = require('express');
const { usuariosGet, 
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch 
       } = require('../controllers/usuarios');
const { validarCampos } = require('../middelwers/validar_campos');
const { roleValido, correoExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();
    router.get('/', usuariosGet);
    router.post('/', [

        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6} ),
        check('correo').custom(correoExiste),
        check('rol').custom( roleValido ),
        validarCampos
    ], usuariosPost);
    router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
         check('rol').custom( roleValido ),
        validarCampos
    ], usuariosPut);
    router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
    ], usuariosDelete);
    router.patch('/', usuariosPatch);



module.exports = router;