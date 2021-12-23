const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')

//***************************************************************** */
const url = 'mongodb://localhost:27017';

const numcrypt = 10
//****************************************************************** */
const loginUser = {
    //Estructura de la db
    collectionEstructure: () => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db("pruebasLogin");
            dbo.collection('user').createIndex({ name: 1 }, { unique: true }), (err, resul) => {
                if (err) throw err
                console.log(resul)
                db.close()
            }
        })
    },
    //****************************************************************** */
    //Subir formulario
    subirFormulario: (name, passw) => new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            bcrypt.hash(passw, numcrypt, (err, pass) => {
                if (err) next(err)
                else {
                    var dbo = db.db("pruebasLogin");
                    dbo.collection('user').insertOne({ name, pass }, (err, resul) => {
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
    //Autenticar Login
    autenticarLogin: (name, passw) => new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db("pruebasLogin");
            dbo.collection('user').find({ name: name }).toArray((err, resul) => {
                if (err) {
                    db.close()
                    resolve(false)
                }
                db.close()
                
                bcrypt.compare(passw, resul[0].pass, (err, res) => {
                    if (err) { resolve(false) }
                    resolve({res:res,
                             id:resul[0]._id})
                })
            })
        })
    })
}

exports.user = loginUser;