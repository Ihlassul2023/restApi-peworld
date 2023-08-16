const pool = require('../config/db')

const postRegisterUser = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Post/register users')
        const {name, email, phone, password, photo, photo_id} = post
        pool.query(`INSERT INTO register_user (name, email, phone, password, photo, photo_id) VALUES ('${name}', '${email}', '${phone}','${password}', '${photo}', '${photo_id}') RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

module.exports = {
    postRegisterUser
}