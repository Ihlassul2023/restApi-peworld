const Pool = require("../config/db");

const getMyWorkExperience = async (id) => {
  // const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM experience WHERE user_id = ${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const postWorkExperience = async (data) => {
  const { position, company_name, user_id, from_month, to_month, description } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO experience(position,company_name,user_id,from_month,to_month, description) VALUES('${position}','${company_name}',${parseInt(user_id)},'${from_month}','${to_month}', '${description}')`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const putWorkExperience = async (data) => {
  const { position, company_name, user_id, from_month, to_month, description, id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`UPDATE experience SET position='${position}',company_name ='${company_name}', user_id=${user_id}, from_month = '${from_month}', to_month='${to_month}', description='${description}' WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getWorkExperienceById = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM experience WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};
const getExperienceByIdForRecruit = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM experience WHERE user_id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const deleteWorkExperienceById = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM experience WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = { getMyWorkExperience, postWorkExperience, putWorkExperience, getWorkExperienceById, deleteWorkExperienceById, getExperienceByIdForRecruit };
