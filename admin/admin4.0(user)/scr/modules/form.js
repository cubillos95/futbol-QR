
const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')


//****************************************************************** */
const url = 'mongodb://localhost:27017';
//****************************************************************** */
const loginUser = {
    //****************************************************************** */
    //Autenticar Login
    autenticarLogin: (name, passw) => new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err
            var dbo = db.db("user");
            dbo.collection('user').find({ name: name }).toArray((err, resul) => {
                if (err) {
                    db.close()
                    resolve(false)
                }
                db.close()
                if (resul.length > 0) {
                    bcrypt.compare(passw, resul[0].pass, (err, res) => {
                        if (err) { resolve(false) }
                        resolve({
                            res: res,
                            id: resul[0]._id,
                            rol:resul[0].rol,
                            name:resul[0].name
                        })
                })
        }
                else{ resolve(false) }

})
        })
    })
}
//****************************************************************** */
exports.login = loginUser;