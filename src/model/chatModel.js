const pool = require("../config/db");
const getParticipantQuery = async (data) => {
  const { user_1, user_2 } = data;
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM participant WHERE user_1=${parseInt(user_1)} AND user_2=${parseInt(user_2)} `, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};
const postParticipantQuery = async (data) => {
  const { user_1, user_2, chat_code } = data;
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO participant (user_1,user_2,chat_code) VALUES (${user_1}, ${user_2}, '${chat_code}') RETURNING * `, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};
const postMessageQuery = async (data) => {
  const { user_1, user_2, chat_code, message, user_id } = data;
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO messages (user_1,user_2,chat_code,message,user_id) VALUES (${user_1}, ${user_2}, '${chat_code}','${message}',${user_id}) RETURNING * `, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};
const getMessageQueryByUser1 = async (chat_code) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT recruiter.id,recruiter.name,recruiter.photo,messages.message,messages.user_id FROM messages JOIN recruiter ON messages.user_1=recruiter.id WHERE chat_code='${chat_code}' ORDER BY messages.created_at ASC`,
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
const getMessageQueryByUser2 = async (chat_code) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT worker.id,worker.name,worker.photo,messages.message,messages.user_id FROM messages JOIN worker ON messages.user_2=worker.id WHERE chat_code='${chat_code}' ORDER BY messages.created_at ASC`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};
const getParticipantByUser1 = async () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT recruiter.name,recruiter.photo,participant.chat_code FROM participant JOIN recruiter ON participant.user_1=recruiter.id`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};
const getParticipantByUser2 = async () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT worker.name,worker.photo,participant.chat_code FROM participant JOIN worker ON participant.user_2=worker.id`, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
};
module.exports = {
  getParticipantQuery,
  postParticipantQuery,
  getMessageQueryByUser1,
  getMessageQueryByUser2,
  postMessageQuery,
  getParticipantByUser1,
  getParticipantByUser2,
};
