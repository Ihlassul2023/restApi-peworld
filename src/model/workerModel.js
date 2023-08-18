const pool = require("../config/db");

const getRegisterWorker = async () => {
  return new Promise((resolve, reject) => {
    console.log("Model: Get register worker");
    pool.query(`SELECT * FROM worker`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

const getWorkerById = async (id) => {
  return new Promise((resolve, reject) => {
    console.log("Model: Get data worker by id");
    pool.query(
      `SELECT 
        FROM worker
        WHERE id = ${id};
        `,
      (err, results) => {
        if (!err) {
          resolve(results);
        } else {
          reject(err);
        }
      }
    );
  });
};

const checkEmailWorker = async (email) => {
  return new Promise((resolve, reject) => {
    console.log("Model: Get data worker by email", email);
    pool.query(`SELECT * FROM worker WHERE email = '${email}'`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

const postRegisterWorker = async (post) => {
  return new Promise((resolve, reject) => {
    console.log("Model: Post/register worker");
    const { name, email, phone, password } = post;
    pool.query(`INSERT INTO worker (name, email, phone,  password) VALUES ('${name}', '${email}', '${phone}', '${password}') RETURNING *`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

const putWorkerById = async (post) => {
  return new Promise((resolve, reject) => {
    console.log("Model: update data company");
    const { name, email, phone, password, photo, photo_id, jobdesk, address, office, description, id } = post;
    pool.query(
      `UPDATE worker SET name = '${name}', email = '${email}', phone = '${phone}', password = '${password}', photo = '${photo}', photo_id = '${photo_id}', jobdesk = '${jobdesk}', address = '${address}', office = '${office}', description = '${description}' WHERE id = ${id} RETURNING *`,
      (err, results) => {
        if (!err) {
          resolve(results);
        } else {
          reject(err);
        }
      }
    );
  });
};

module.exports = {
  getRegisterWorker,
  getWorkerById,
  checkEmailWorker,
  postRegisterWorker,
  putWorkerById,
};
