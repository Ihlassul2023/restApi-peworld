const { getParticipantQuery, getMessageQueryByUser1, getMessageQueryByUser2, getParticipantByUser1, getParticipantByUser2, postMessageQuery, postParticipantQuery } = require("../model/chatModel");
const { v4: uuidv4 } = require("uuid");

const postMessage = async (req, res) => {
  const { user_1, user_2, message } = req.body;
  const checkParticipant = await getParticipantQuery(req.body);
  if (checkParticipant.rows.length == 0) {
    const data = {
      user_1,
      user_2,
      message,
      chat_code: uuidv4(),
      user_id: req.payload.id,
    };
    await postParticipantQuery(data);
    await postMessageQuery(data);
  } else {
    const data = {
      user_1,
      user_2,
      message,
      chat_code: checkParticipant.rows[0].chat_code,
      user_id: req.payload.id,
    };
    await postMessageQuery(data);
  }
  res.status(200).json({
    status: 200,
    message: "pesan terkirim",
  });
};
const getParticipantUser1 = async (req, res) => {
  const result = await getParticipantByUser1(req.payload.id);
  res.status(200).json({
    status: 200,
    message: "get success",
    data: result.rows,
  });
};
const getParticipantUser2 = async (req, res) => {
  const result = await getParticipantByUser2(req.payload.id);
  res.status(200).json({
    status: 200,
    message: "get success",
    data: result.rows,
  });
};
const getMessageUser1 = async (req, res) => {
  const result = await getMessageQueryByUser1(req.params.id);
  res.status(200).json({
    status: 200,
    message: "get success",
    profile: {
      id: result.rows[0].id,
      name: result.rows[0].name,
      photo: result.rows[0].photo,
    },
    data: result.rows,
  });
};
const getMessageUser2 = async (req, res) => {
  const result = await getMessageQueryByUser2(req.params.id);
  res.status(200).json({
    status: 200,
    message: "get success",
    profile: {
      id: result.rows[0].id,
      name: result.rows[0].name,
      photo: result.rows[0].photo,
    },
    data: result.rows,
  });
};
module.exports = {
  postMessage,
  getParticipantUser1,
  getParticipantUser2,
  getMessageUser1,
  getMessageUser2,
};
