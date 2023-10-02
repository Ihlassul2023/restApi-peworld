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

const searchAndSort = async (post) => {
  return new Promise((resolve, reject) => {
    console.log("Model: search and sort worker", post);
    const { searchby, search, sortby, sort, offset, limit } = post;
    Pool.query(
      `SELECT worker.id, worker.name, worker.photo, worker.jobdesk, worker.address, worker.office, worker.description, skill.skill_name FROM skill JOIN worker ON skill.user_id = worker.id WHERE ${searchby} ILIKE '%${search}%' ORDER BY ${sortby} ${sort} OFFSET ${offset} LIMIT ${limit}`,
      (err, results) => {
        if (!err) {
          const data = {
            count: results.rowCount, // Jumlah total data (total row count)
            rows: results.rows, // Data hasil query
          };
          resolve(data);
        } else {
          reject(err);
        }
      }
    );
  });
};
//JOIN worker ON skill.user_id = worker.id
const searchAndSortCount = async (post) => {
  return new Promise((resolve, reject) => {
    console.log("Model: search and sort worker", post);
    const { searchby, search, sortby, sort, offset, limit } = post;
    Pool.query(`SELECT COUNT(*) FROM worker JOIN skill ON worker.id = skill.user_id WHERE ${searchby} ILIKE '%${search}%'`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = { getSkillAll, getSkillById, postSkill, putSkill, deleteById, searchAndSort, searchAndSortCount };
