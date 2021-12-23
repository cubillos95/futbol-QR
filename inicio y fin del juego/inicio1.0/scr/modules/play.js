const { MongoClient } = require('mongodb')

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
            dbo.collection('vs').insertOne({ dato }, (err, resul) => {
                if (err) {
                    db.close()
                    resolve('Error')
                }
                db.close()
                resolve('Campeonato Iniciado')
            })
        })
    })
}
exports.play = juego;