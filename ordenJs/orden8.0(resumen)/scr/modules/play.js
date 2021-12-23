const { MongoClient } = require('mongodb')
var mongodb = require('mongodb')
const url = 'mongodb://localhost:27017';


/*
*Operaciones basadas en el inicio y fin de de los partidos
*
*/

const juego = {
    Inicio: (dato, campeonato) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(campeonato);
            dbo.collection('vs').insertOne(dato, (err, resul) => {
                if (err) {
                    db.close()
                    resolve('Error')
                }
                db.close()
                resolve('Campeonato Iniciado')
            })
        })
    }),
    //Extraer tablas vs
    tablaVs: (campeonato) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(campeonato);
            dbo.collection('vs').find({}).toArray((err, resul) => {
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
    //Actualizacion tabla vs
    actualizacionVs: (id, campeonato) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(campeonato);
            dbo.collection('vs').updateOne(
                { _id: mongodb.ObjectID(id) },
                {
                    $set: {
                        estado: 0
                    }
                }
                , (err, resul) => {
                    if (err) {
                        db.close()
                        resolve('error')
                    }
                    else {
                        db.close()
                        resolve('Encuentro Finalizado')
                    }
                })

        })
    }),
    //**************************************************************** */
    //Encuentros
    encuentros: (campeonato, dato) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(campeonato);
            dbo.collection('encuentros').insertOne(dato, (err, resul) => {
                if (err) {
                    db.close()
                    resolve('Error')
                }
                db.close()
                resolve('Accion agregada')
            })
        })
    }),
    //Sacar datos Encuentros
    datosEncuentros: (campeonato, codigo) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(campeonato);
            dbo.collection('encuentros').find({ codigo: codigo }).toArray((err, resul) => {
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
    //llenar tabla conclucion encuentro
    conclucion: (campeonato, dato, fecha, responsable) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(campeonato);
            dbo.collection('conclucion').insertOne({
                dato: dato,
                fecha: fecha,
                responsable: responsable
            }, (err, resul) => {
                if (err) {
                    db.close()
                    resolve('Error')
                }
                db.close()
                resolve('Encuentro finalizado')
            })
        })
    }),
    //*********************************************************** */
    //return tabla conclucion
    tablaConclucion:(campeonato) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(campeonato);
            dbo.collection('conclucion').find({}).toArray((err, resul) => {
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
exports.play = juego;