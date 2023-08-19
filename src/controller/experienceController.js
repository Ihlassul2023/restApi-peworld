const { getMyWorkExperience, getWorkExperienceById, getExperienceByIdForRecruit, postWorkExperience, putWorkExperience, deleteWorkExperienceById } = require("../model/experienceModel");
const { StatusCodes } = require("http-status-codes");
const getMyWE = async (req, res) => {
  const id = req.payload.id;
  const dataWE = await getMyWorkExperience(id);
  if (dataWE.rows.length != 0) {
    res.status(StatusCodes.OK).json({ message: "success", data: dataWE.rows });
  } else {
    return res.status(404).json({ message: "data not found!" });
  }
};
const getWEById = async (req, res) => {
  const { id } = req.params;
  const dataWE = await getWorkExperienceById(id);
  if (dataWE.rows.length != 0) {
    res.status(StatusCodes.OK).json({ msg: "success", data: dataWE.rows[0] });
  } else {
    return res.status(404).json({ msg: "data not found!" });
  }
};
const getWEByIdForRecruit = async (req, res) => {
  const { id } = req.params;
  const dataWE = await getExperienceByIdForRecruit(id);
  if (dataWE.rows.length != 0) {
    res.status(StatusCodes.OK).json({ msg: "success", data: dataWE.rows });
  } else {
    return res.status(404).json({ msg: "data not found!" });
  }
};
const postWE = async (req, res) => {
  req.body.user_id = req.payload.id;
  await postWorkExperience(req.body);
  return res.status(StatusCodes.CREATED).json({ msg: "success", data:req.body });
};
const putWE = async (req, res) => {
  const { position, company_name, fromMonth, toMonth, description } = req.body;
  const { id } = req.params;
  const dataWE = await getWorkExperienceById(id);
  const data = {
    position: position || dataWE.rows[0].position,
    company_name: company_name || dataWE.rows[0].company_name,
    fromMonth: fromMonth || dataWE.rows[0].fromMonth,
    toMonth: toMonth || dataWE.rows[0].toMonth,
    user_id: parseInt(req.payload.id),
    description: description || dataWE.rows[0].description,
    id,
  };
  await putWorkExperience(data);
  return res.status(StatusCodes.CREATED).json({ msg: "success" });
};
const deleteWE = async (req, res) => {
  const { id } = req.params;
  await deleteWorkExperienceById(id);
  res.status(StatusCodes.CREATED).json({ msg: "success" });
};
module.exports = { getMyWE, getWEById, postWE, putWE, deleteWE, getWEByIdForRecruit };
