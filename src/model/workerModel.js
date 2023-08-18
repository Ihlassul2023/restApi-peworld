const pool = require('../config/db')

const getProfileWorker = async () => {
    return new Promise((resolve,reject)=>{
    console.log('Model: Get profile worker')
        pool.query(`SELECT * FROM profile_worker`,(err,results)=>{
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
    console.log('Model: Get profile worker by id')
        pool.query(`SELECT * FROM profile_worker WHERE id = ${id}`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const postProfileWorker = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Post/register worker')
        const {name, jobdesk, address, office, description, user_id, experience_id, portofolio_id, skill_id} = post
        pool.query(`INSERT INTO profile_worker (name, jobdesk, address, office, description, user_id, experience_id, portofolio_id, skill_id) VALUES ('${name}', '${jobdesk}', '${address}', '${office}', '${description}', ${user_id}, ${experience_id}, ${portofolio_id}, ${skill_id}') RETURNING *`, (err, results)=>{
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
      console.log('Model: update profile company');
      const {name, jobdesk, address, office, description, id} = post
      pool.query(
        `UPDATE profile_company SET name = '${name}', jobdesk = '${jobdesk}', address = '${address}', office = '${office}', description = '${description}' WHERE id = ${id} RETURNING *`,
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
    getProfileWorker,
    getWorkerById,
    postProfileWorker,
    putWorkerById
}