const {
    getProfileCompany,
    postProfileCompany
  } = require('../model/companyModel');
  
  const companyController = {
    getProfile: async (req, res) => {
      try {
        const result = await getProfileCompany();
        if (result.rows.length > 0) {
          console.log('Hasil get profile company', result.rows);
          return res.status(200).json({
            status: 200,
            message: 'Get profile company success!',
            data: result.rows,
          });
        } else {
          console.log('Data perusahaan tidak ditemukan');
          return res
            .status(404)
            .json({ status: 404, message: 'Data company not found!' });
        }
      } catch (error) {
        console.error('Error saat get company:', error.message);
        return res.status(500).json({ status: 500, message: 'Get company error!' });
      }
    },
    postProfile: async (req, res) => {
      try {
        const { name, sector, province, city, description, email_hrd, email_corp, phone, linkedin } = req.body;
        let post = {
          name: name,
          sector: sector,
          province: province,
          city: city,
          description: description,
          email_hrd: email_hrd,
          email_corp: email_corp,
          phone: phone,
          linkedin: linkedin
        };
  
        const result = await postProfileCompany(post);
        if (result) {
          console.log('Hasil post', result.rows);
          return res.status(200).json({
            status: 200,
            message: 'Post profile company success!',
            data: result.rows,
          });
        }
      } catch (error) {
        console.error('Error saat post profile company', error.message);
        return res
          .status(500)
          .json({ status: 500, message: 'Post profile company error!' });
      }
    }
  };
  
  module.exports = companyController;  