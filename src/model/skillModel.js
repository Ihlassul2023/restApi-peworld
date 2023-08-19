const Pool = require("../config/db");

const getSkillAll = async () => {
  console.log("model getSkill");
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM skill`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getSkillById = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM skill WHERE user_id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const postSkill = async (data) => {
  const { skill_name, user_id } = data;
  console.log(data);
  console.log("model postSkill");
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO skill(skill_name, user_id) VALUES('${skill_name}', '${user_id}')`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const putSkill = async (data) => {
  const { skill_name, user_id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`UPDATE skill SET skill_name='${skill_name}' WHERE user_id=${user_id} RETURNING *`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const deleteById = async (id) => {
  console.log("delete user by id ->", id);
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM skill WHERE user_id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = { getSkillAll, getSkillById, postSkill, putSkill, deleteById };
