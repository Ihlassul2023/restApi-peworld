const { getSkillAll, getSkillById, postSkill, putSkill, deleteById } = require("../model/skillModel");

const SkillController = {
  getData: async (req, res, next) => {
    try {
      let data = await getSkillAll();
      if (data) {
        res.status(200).json({ status: 200, message: "get data skill success", data: data.rows });
      }
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },

  getSkillById: async (req, res, next) => {
    try {
      const { id } = req.payload;

      if (!id || id <= 0 || isNaN(id)) {
        return res.status(404).json({ message: "id wrong" });
      }

      let dataSkillId = await getSkillById(parseInt(id));

      if (!dataSkillId.rows[0]) {
        return res.status(200).json({ status: 200, message: "get data skill not found", data: [] });
      }

      return res.status(200).json({ status: 200, message: "get data recipe success", data: dataSkillId.rows[0] });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },

  postData: async (req, res, next) => {
    try {
      const { id } = req.payload;
      const { skill_name } = req.body;

      if (!skill_name) {
        return res.status(404).json({ message: "input required" });
      }
      let data = {
        skill_name: skill_name,
        user_id: parseInt(id),
      };

      console.log("data");
      console.log(data);
      let dataSkillId = await getSkillById(parseInt(id));
      !dataSkillId.rows[0] ? await postSkill(data) : await putSkill(data);

      return res.status(200).json({ status: 200, message: "data skill success", data });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },

  putData: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { skill_name } = req.body;

      if (!id || id <= 0 || isNaN(id)) {
        return res.status(404).json({ message: "id wrong" });
      }

      let dataSkillId = await getSkillById(parseInt(id));
      if (dataSkillId.rowCount === 0) {
        return res.status(404).json({ status: 404, message: "The data you tried to update is not found in the database" });
      }
      let data = {
        skill_name: skill_name || dataSkillId.rows[0].skill_name,
      };

      let result = await putSkill(data, id);

      return res.status(200).json({ status: 200, message: "update skill success", data });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },

  deleteDataById: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      if (!user_id || user_id <= 0 || isNaN(user_id)) {
        return res.status(404).json({ message: "id wrong" });
      }

      let result = await deleteById(parseInt(user_id));
      console.log(result);
      if (result.rowCount == 0) {
        throw new Error("delete data failed");
      }
      return res.status(200).json({ status: 200, message: "delete data skill success", data: result.rows[0] });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },
};

module.exports = SkillController;
