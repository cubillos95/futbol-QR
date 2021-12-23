const { MongoClient } = require('mongodb')


const url = 'mongodb://localhost:27017';
//**************************************************************** */

//**************************************************************** */
const mongoCrud = {
    subirDatos: (name,datos) => new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            var dbo = db.db("pruebasLogin");
            dbo.collection(name).insertMany(JSON.parse(datos), (err, res) => {
                if (err) {
                    db.close()
                    resolve('error')
                }
                db.close()
                resolve('datos insertados')
            })
        })
    })
}
//**************************************************************** */

exports.mongo = mongoCrud;