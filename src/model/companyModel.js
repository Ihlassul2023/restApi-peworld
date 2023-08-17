const pool = require('../config/db')

const getProfileCompany = async () => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get profile company')
        pool.query(`SELECT * FROM profile_company`,(err,results)=>{
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
    console.log('Model: Get profile company by id')
        pool.query(`SELECT * FROM profile_company WHERE id = ${id}`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const postProfileCompany = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Post/register users')
        const {name, sector, province, city, description, email_hrd, email_corp, phone, linkedin, user_id} = post
        pool.query(`INSERT INTO profile_company (name, sector, province, city, description, email_hrd, email_corp, phone, linkedin, user_id) VALUES ('${name}', '${sector}', '${province}', '${city}', '${description}', '${email_hrd}', '${email_corp}', '${phone}', '${linkedin}', '${user_id}') RETURNING *`, (err, results)=>{
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
      console.log('Model: update profile company');
      const {name, sector, province, city, description, email_hrd, email_corp, phone, linkedin, id} = post
      pool.query(
        `UPDATE profile_company SET name = '${name}', sector = '${sector}', province = '${province}', city = '${city}', description = '${description}', email_hrd = '${email_hrd}', email_corp = '${email_corp}', phone = '${phone}', linkedin = '${linkedin}' WHERE id = ${id} RETURNING *`,
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
    getProfileCompany,
    getCompanyById,
    postProfileCompany,
    putCompanyById
}