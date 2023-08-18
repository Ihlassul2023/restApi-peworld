const pool = require('../config/db')

const getRegisterCompany = async () => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get register company')
        pool.query(`SELECT * FROM register_company`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const getCompanyById = async (id) => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get data company by id')
        pool.query(`SELECT * FROM register_company WHERE id = ${id}`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const validateEmailCompany = async (email) => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get data company by email', email)
        pool.query(`SELECT * FROM register_company WHERE email = '${email}'`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const postRegisterCompany = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Post/register company')
        const {name, email, phone, company, position, password, photo, photo_id, validate} = post
        pool.query(`INSERT INTO register_company (name, email, phone, company, position, password, photo, photo_id, validate) VALUES ('${name}', '${email}', '${phone}', '${company}', '${position}', '${password}', '${photo}', '${photo_id}', '${validate}') RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const putCompanyById = async (post) => {
    return new Promise((resolve, reject) => {
      console.log('Model: update data company');
      const {name, email, phone, company, position, password, photo, photo_id, id} = post
      pool.query(
        `UPDATE register_company SET name = '${name}', email = '${email}', phone = '${phone}', company = '${company}', position = '${position}', password = '${password}', photo = '${photo}', photo_id = '${photo_id}' WHERE id = ${id} RETURNING *`,
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
    getRegisterCompany,
    getCompanyById,
    validateEmailCompany,
    postRegisterCompany,
    putCompanyById
}