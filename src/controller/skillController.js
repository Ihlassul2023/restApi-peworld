const { getSkillAll, getSkillById, postSkill, putSkill, deleteById, searchAndSort } = require("../model/skillModel");

const SkillController = {
  getData: async (req, res, next) => {
    try {
      let data = await getSkillAll();
      if (data) {
        return res.status(200).json({ status: 200, message: "get data skill success", data: data.rows });
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
  getSkillByIdForRecruit: async (req, res, next) => {
    try {
      const { id } = req.params;

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
      const { id } = req.payload;
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
        user_id: id
      };

      let result = await putSkill(data);

      return res.status(200).json({ status: 200, message: "update skill success", data:result.rows[0] });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },

  deleteDataById: async (req, res, next) => {
    try {
      const { id } = req.payload;

      if (!id || id <= 0 || isNaN(id)) {
        return res.status(404).json({ message: "id wrong" });
      }

      let result = await deleteById(parseInt(id));
      console.log(result);
      if (result.rowCount == 0) {
        throw new Error("delete data failed");
      }
      return res.status(200).json({ status: 200, message: "delete data skill success", data: result.rows[0] });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },
  searchSort: async (req, res) => {
    console.log('Control: Running search sort worker')
    try {
      const {searchby, search, sortby, sort, limit} = req.query
      let page = parseInt(req.query.page) || 1;
      let limiter = limit || 5

      const post = {
        sortby: sortby || 'name',
        sort: sort || 'ASC',
        limit: limit || 5,
        offset: (page - 1) * limiter,
        searchby: searchby || 'skill',
        search: search 
      };
      const resultTotal = await getSkillAll()
      const result = await searchAndSort(post);
      let pagination = {
        totalPage: Math.ceil(resultTotal.rowCount / limiter),
        totalData: parseInt(result.count),
        pageNow: page
      };
      if (result.rows.length > 0) {
        console.log(result.rows);
        return res.status(200).json({data:result.rows, page:pagination});
      } else {
        console.log('Data tidak ditemukan');
        return res.status(404).json({status: 404, message: "Data not found"});
      }
    } catch (error) {
        console.error(`Error : ${error.message}`);
        return res.status(500).json({status: 500, message: "Search and sort data error"});
    }
  }
};

module.exports = SkillController;
