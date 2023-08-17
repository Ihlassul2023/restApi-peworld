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

const postProfileCompany = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: Post/register users')
        const {name, sector, province, city, description, email_hrd, email_corp, phone, linkedin} = post
        pool.query(`INSERT INTO register_user (name, email, phone, company, position, password, photo, photo_id, validate) VALUES ('${name}', '${name}', '${sector}', '${province}', '${city}', '${description}', '${email_hrd}', '${email_corp}', '${phone}', '${linkedin}') RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}


module.exports = {
    getProfileCompany,
    postProfileCompany
}