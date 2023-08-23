const Pool = require("../config/db");

const getMyPortfolio = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM portfolio WHERE user_id = ${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const postPortfolio = async (data) => {
  const { name, link_repo, type, photo, photo_id, user_id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO portfolio(name, link_repo, user_id, type, photo, photo_id) VALUES('${name}','${link_repo}',${parseInt(user_id)},'${type}','${photo}','${photo_id}')`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const putPortfolio = async (data) => {
  const { name, link_repo, type, photo, photo_id, user_id, id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`UPDATE portfolio SET name='${name}',link_repo ='${link_repo}', type='${type}', photo = '${photo}', photo_id='${photo_id}', user_id=${user_id} WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getPortfolioById = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM portfolio WHERE id=${parseInt(id)}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};
const getPortoByIdForRecruit = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM portfolio WHERE user_id=${parseInt(id)}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const deletePortfolioById = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM portfolio WHERE id=${parseInt(id)}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = { getMyPortfolio, postPortfolio, putPortfolio, getPortfolioById, getPortoByIdForRecruit, deletePortfolioById };
