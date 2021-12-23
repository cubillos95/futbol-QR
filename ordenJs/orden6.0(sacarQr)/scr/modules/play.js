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
    tablaVs:(campeonato) => new Promise((resolve) => {
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
    actualizacionVs:(id,campeonato)=> new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(campeonato);
            dbo.collection('vs').updateOne(
                {_id: mongodb.ObjectID(id)},
                { $set:{
                    estado:0
                }}
            ,(err, resul) => {
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
    })
}
exports.play = juego;