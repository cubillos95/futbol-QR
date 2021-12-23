const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')
//sudo mongod --dbpath /var/lib/mongodb
//************************************************ */
const url = 'mongodb://localhost:27017';
const numcrypt = 10
//*********************************************** */



//************************************* */

const atmin = {
    //****************************************************************** */
    //nameUser, pass , rool
    crear: (name, passw,rol,nombre,apellido,cedula) => new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            bcrypt.hash(passw, numcrypt, (err, pass) => {
                if (err) next(err)
                else {
                    var dbo = db.db("user");
                    dbo.collection('user').insertOne({ name, pass ,rol ,nombre,apellido,cedula}, (err, resul) => {
                        if (err) {
                            db.close()
                            resolve('Este Usuario ya existe')
                        }
                        db.close()
                        resolve('Usuario Creado')
                    })
                }
            })
        })
    }),
    //****************************************************************** */
}


//********************************************************************** */
//atmin.crear('admin','12345678?','admin').then(x => console.log(x))


exports.atmin = atmin;