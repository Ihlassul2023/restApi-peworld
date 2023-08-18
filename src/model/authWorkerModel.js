const pool = require('../config/db')

const getRegisterWorker = async () => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get register worker')
        pool.query(`SELECT * FROM register_worker`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const getWorkerById = async (id) => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get data worker by id')
        pool.query(`SELECT * FROM register_worker WHERE id = ${id}`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const validateEmailWorker = async (email) => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get data worker by email', email)
        pool.query(`SELECT * FROM register_worker WHERE email = '${email}'`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const postRegisterWorker = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Post/register worker')
        const {name, email, phone, password, photo, photo_id, validate} = post
        pool.query(`INSERT INTO register_worker (name, email, phone, company, position, password, photo, photo_id, validate) VALUES ('${name}', '${email}', '${phone}', '${password}', '${photo}', '${photo_id}', '${validate}') RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const putWorkerById = async (post) => {
    return new Promise((resolve, reject) => {
      console.log('Model: update data company');
      const {name, email, phone, password, photo, photo_id, id} = post
      pool.query(
        `UPDATE register_worker SET name = '${name}', email = '${email}', phone = '${phone}', password = '${password}', photo = '${photo}', photo_id = '${photo_id}' WHERE id = ${id} RETURNING *`,
        (err, results) => {
          if (!err) {
            resolve(results);
          } else {
            reject(err);
          }
        }
      );
    });
}


module.exports = {
    getRegisterWorker,
    getWorkerById,
    validateEmailWorker,
    postRegisterWorker,
    putWorkerById
}