const pool = require('../config/db')

const getRegisterUser = async () => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get register users')
        pool.query(`SELECT * FROM register_user`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const postRegisterUser = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Post/register users')
        const {name, email, phone, company, position, password, photo, photo_id, check} = post
        pool.query(`INSERT INTO register_user (name, email, phone, password, photo, photo_id, check) VALUES ('${name}', '${email}', '${company}', '${position}', '${phone}','${password}', '${photo}', '${photo_id}, '${check}'') RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

module.exports = {
    getRegisterUser,
    postRegisterUser
}