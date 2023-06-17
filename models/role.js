const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    }
});

module.exports = model( 'Role', RoleSchema );
