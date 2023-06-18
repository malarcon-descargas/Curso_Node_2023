const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise( (resolve, reject) => {
        const payload = {uid};

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
<<<<<<< HEAD
=======
                console.log(err);
>>>>>>> 38663ebd8bfb38eec714f51891b97cec429f1eef
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })
    });
}

module.exports = {
    generarJWT
}

