const Pool = require("../config/db");

const getMyWorkExperience = async (data) => {
  const { id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * experience WHERE id = ${parseInt(id)}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const postWorkExperience = async (data) => {
  const { position, company_name, user_id, fromMonth, toMonth } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO experience(position,company_name,user_id,fromMonth,toMonth) VALUES('${position}','${company_name}',${parseInt(user_id)},'${fromMonth}','${toMonth}')`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const putWorkExperience = async (data) => {
  const { position, company_name, user_id, fromMonth, toMonth, id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`UPDATE experience SET position='${position}',company_name ='${company_name}', user_id=${user_id}, fromMonth = '${fromMonth}', toMonth='${toMonth}' WHERE id=${id}`, (err, result) => {
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

module.exports = { getMyWorkExperience, postWorkExperience, putWorkExperience, getWorkExperienceById, deleteWorkExperienceById };
