const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017';


//************************************************************ */
const userCrud = {
    //********************************************************* */
    //descargar informacion del usuario
    desUser: (user) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db('user');
            dbo.collection('userCamp').find({ user: user }).toArray((err, resul) => {
                if (err) {
                    db.close()
                    resolve('error')
                }
                else {
                    db.close()
                    resolve(resul)
                }
            })
        })
    }),
    //*************************************************************** */
    consultarEquipos: (campeonato) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(campeonato);
            dbo.listCollections().toArray(function (err, resul) {
                if (err) {
                    db.close()
                    resolve('error')
                }
                else {
                    db.close()
                    resolve(resul)
                }
            });
        })
    }),
    //****************************************************************** */
    //Eliminar Equipos
    eliminarEquipo: (campeonato, equipo) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            var dbo = db.db(campeonato);
            dbo.collection('Eliminados').insertOne({ equipo: equipo }, (err, res) => {
                if (err) {
                    db.close()
                    resolve('error')
                }
                db.close()
                resolve('Equipo Eliminado')
            })
        })
    }),
    //************************************************************* */
    //leer equipos eliminados
    leerEquiposEliminados: (campeonato) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(campeonato);
            dbo.collection('Eliminados').find({}).toArray((err, resul) => {
                if (err) {
                    db.close()
                    resolve('error')
                }
                else {
                    db.close()
                    resolve(resul)
                }
            })
        })
    })
}

exports.userCrud = userCrud;