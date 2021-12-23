const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017';

const adminCampeonatos = {
    //Crear campeonato
    crearCampeonato: (name) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db("campeonato-" + name);
            dbo.collection('vs').insertOne({ gato: 'michis' }, (err, resul) => {
                if (err) {
                    db.close()
                    resolve('Error')
                }
                else {
                    db.close()
                    resolve('db  creada')
                }
            })

        })
    }),
    //************************************************************ */
    //lista de campeonatos
    listaCampeonatos: () => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db("admin").admin();
            dbo.listDatabases((err, resul) => {
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
    //************************************************************ */
    //Subir equipo
    subirEquipo: (name, datos, dataBase) => new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            var dbo = db.db(dataBase);
            dbo.collection("equipo-" + name).insertMany(JSON.parse(datos), (err, res) => {
                if (err) {
                    db.close()
                    resolve('error')
                }
                db.close()
                resolve('datos insertados')
            })
        })
    }),
    //************************************************************ */
    //lista de collections
    listaCollections: (database) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(database);
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
    //*************************************************************** */
    //consulta equipo
    consultaEquipo: (database, collection) => new Promise((resolve) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db(database);
            dbo.collection(collection).find({}).toArray((err, resul) => {
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

exports.admin = adminCampeonatos;