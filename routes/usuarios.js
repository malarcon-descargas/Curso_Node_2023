const {Router} = require('express');
const {check} = require('express-validator');

const {
    validarCampos,
    validarJWT,
    tieneRole
} = require('../middlewares');

const { 
    existeRol, 
    existeEmail, 
    existeUsuario
} = require('../helpers/db-validators');

const { 
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosDelete, 
    usuariosPatch 
} = require('../controllers/usuarios');

const router = Router();

router.get('/', [
    validarJWT,
], usuariosGet);

router.post('/',
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    check('rol').custom(existeRol),
    validarCampos
], usuariosPost);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom(existeRol),
    validarCampos
],usuariosPut);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;