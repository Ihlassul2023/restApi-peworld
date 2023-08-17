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

const validateByEmail = async (email) => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get users by email', email)
        pool.query(`SELECT * FROM register_user WHERE email = '${email}'`,(err,results)=>{
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
        const {name, email, phone, company, position, password, photo, photo_id, validate} = post
        pool.query(`INSERT INTO register_user (name, email, phone, company, position, password, photo, photo_id, validate) VALUES ('${name}', '${email}', '${phone}', '${company}', '${position}', '${password}', '${photo}', '${photo_id}', '${validate}') RETURNING *`, (err, results)=>{
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
    validateByEmail,
    postRegisterUser
}