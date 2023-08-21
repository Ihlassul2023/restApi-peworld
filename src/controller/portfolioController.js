const { getMyPortfolio, getPortoByIdForRecruit, postPortfolio, putPortfolio, getPortfolioById, deletePortfolioById } = require("../model/portfolioModel");
const cloudinary = require("../config/cloudinary");

const { StatusCodes } = require("http-status-codes");
const getMyPorto = async (req, res) => {
  const id = req.payload.id;
  const dataPorto = await getMyPortfolio(id);
  if (dataPorto.rows.length != 0) {
    res.status(StatusCodes.OK).json({ message: "success", data: dataPorto.rows });
  } else {
    return res.status(404).json({ message: "data not found!" });
  }
};
const getPortoById = async (req, res) => {
  const { id } = req.params;
  const dataPorto = await getPortfolioById(id);
  if (dataPorto.rows[0]) {
    res.status(StatusCodes.OK).json({ msg: "success", data: dataPorto.rows[0] });
  } else {
    return res.status(404).json({ msg: "data not found!" });
  }
};
const getPortByIdForRecruit = async (req, res) => {
  const { id } = req.params;
  const dataPorto = await getPortoByIdForRecruit(id);
  if (dataPorto.rows.length != 0) {
    res.status(StatusCodes.OK).json({ msg: "success", data: dataPorto.rows });
  } else {
    return res.status(404).json({ msg: "data not found!" });
  }
};
const postPorto = async (req, res) => {
  req.body.user_id = req.payload.id;
  let result_up;
  if (req.file) {
    // Jika req.file ada, upload gambar baru dan delete gambar lama
    result_up = await cloudinary.uploader.upload(req.file.path, { folder: "HireJob" });
  }
  req.body.photo = result_up?.secure_url;
  req.body.photo_id = result_up?.public_id;
  await postPortfolio(req.body);
  return res.status(StatusCodes.CREATED).json({ msg: "success", data:req.body});
};
const putPorto = async (req, res) => {
  const { name, link_repo, type } = req.body;
  const { id } = req.params;
  let result_up;
  const dataPorto = await getPortfolioById(id);
  if (dataPorto.rows[0].user_id === req.payload.id) {
    if (req.file) {
      result_up = await cloudinary.uploader.upload(req.file.path, { folder: "HireJob" });
      await cloudinary.uploader.destroy(dataPorto.rows[0].photo_id);
    }
    const data = {
      name: name || dataPorto.rows[0].name,
      link_repo: link_repo || dataPorto.rows[0].link_repo,
      type: type || dataPorto.rows[0].type,
      user_id: parseInt(req.payload.id),
      photo: result_up?.secure_url || dataPorto.rows[0].photo,
      photo_id: result_up?.public_id || dataPorto.rows[0].photo_id,
      id,
    };
    await putPortfolio(data);
    return res.status(StatusCodes.CREATED).json({ msg: "success" });
  } else {
    return res.status(404).json({ status: 404, message: "This not your portfolio!" });
  }
};
const deletePorto = async (req, res) => {
  const { id } = req.params;
  let getPorto = await getPortoById(id)
  if(getPorto){
    await cloudinary.uploader.destroy(getPorto.rows[0].photo_id);
  }
  await deletePortfolioById(id);
  res.status(StatusCodes.CREATED).json({ msg: "success" });
};
module.exports = { getMyPorto, getPortoById, postPorto, putPorto, deletePorto, getPortByIdForRecruit };
