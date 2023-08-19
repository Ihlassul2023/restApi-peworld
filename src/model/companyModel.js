const pool = require("../config/db");

const getRegisterCompany = async () => {
  return new Promise((resolve, reject) => {
    console.log("Model: Get register company");
    pool.query(`SELECT * FROM recruiter`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

const getCompanyById = async (id) => {
  return new Promise((resolve, reject) => {
    console.log("Model: Get data company by id");
    pool.query(`SELECT * FROM recruiter WHERE id = ${id}`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

const checkEmailCompany = async (email) => {
  return new Promise((resolve, reject) => {
    console.log("Model: Get data company by email", email);
    pool.query(`SELECT * FROM recruiter WHERE email = '${email}'`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};
// name, email, phone, company_name, position, password,
const postRegisterCompany = async (post) => {
  return new Promise((resolve, reject) => {
    console.log("Model: Post/register company");
    const { name, email, phone, company_name, position, password } = post;
    pool.query(`INSERT INTO recruiter (name, email, phone, company_name, position, password) VALUES ('${name}', '${email}', '${phone}', '${company_name}', '${position}', '${password}') RETURNING *`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

const putCompanyById = async (post) => {
  return new Promise((resolve, reject) => {
    console.log("Model: update data company");
    const { name, email, phone, company_name, position, password, photo, photo_id, sector, province, city, description, email_hrd, email_corp, linkedin, id } = post;
    pool.query(
      `UPDATE recruiter SET name = '${name}', email = '${email}', phone = '${phone}', company_name = '${company_name}', position = '${position}', password = '${password}', photo = '${photo}', photo_id = '${photo_id}', sector = '${sector}', province = '${province}', city = '${city}', description = '${description}', email_hrd = '${email_hrd}', email_corp = '${email_corp}', linkedin = '${linkedin}' WHERE id = ${id} RETURNING *`,
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

const deleteAccountCompany = async (id) => {
  return new Promise((resolve, reject) => {
    console.log("Model: Delete account company", id);
    pool.query(`DELETE FROM recruiter WHERE id = ${id} RETURNING *`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  getRegisterCompany,
  getCompanyById,
  checkEmailCompany,
  postRegisterCompany,
  putCompanyById,
  deleteAccountCompany,
};
