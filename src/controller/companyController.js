const {
    getProfileCompany,
    getCompanyById,
    postProfileCompany,
    putCompanyById
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
    getCompanyId: async (req, res) => {
      try {
        const {id} = req.params
        const result = await getCompanyById(id);
        if (result.rows.length > 0) {
          console.log('Hasil get company by id', result.rows[0]);
          return res.status(200).json({
            status: 200,
            message: 'Get profile company success!',
            data: result.rows[0],
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

        let user_id =  req.payload.id
        // return(console.log('decode',user_id))

        let post = {
          name: name,
          sector: sector,
          province: province,
          city: city,
          description: description,
          email_hrd: email_hrd,
          email_corp: email_corp,
          phone: phone,
          linkedin: linkedin,
          user_id
        };
  
        const result = await postProfileCompany(post);
        if (result) {
          console.log('Hasil post', result.rows);
          return res.status(200).json({
            status: 200,
            message: 'Post profile company success!',
            data: result.rows[0],
          });
        }
      } catch (error) {
        console.error('Error saat post profile company', error.message);
        return res
          .status(500)
          .json({ status: 500, message: 'Post profile company error!' });
      }
    },
    updateProfile: async (req, res) => {
        console.log('Control: Running update profile company')
        try {
        const {id} = req.params
        const {name, sector, province, city, description, email_hrd, email_corp, phone, linkedin} = req.body

        let dataCompany = await getCompanyById(id)

        let post = {
          id: id,
          name: name || dataCompany.rows[0].name,
          sector: sector || dataCompany.rows[0].sector,
          province: province || dataCompany.rows[0].province,
          city: city || dataCompany.rows[0].city,
          description: description || dataCompany.rows[0].description,
          email_hrd: email_hrd || dataCompany.rows[0].email_hrd,
          email_corp: email_corp || dataCompany.rows[0].email_corp,
          phone: phone || dataCompany.rows[0].phone,
          linkedin:linkedin || dataCompany.rows[0].linkedin
        }

        let user_id =  req.payload.id

        // return (console.log('Update check', company_id))

        if(user_id != dataCompany.rows[0].user_id){
            return res.status(404).json({ status: 404, message: 'This is not your profile!' })
        }

        const result = await putCompanyById(post);
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json({
                status: 200,
                message: 'Update profile company success!',
                data: result.rows[0],
              });
          } else {
              console.log('Data company tidak ditemukan')
              return res.status(404).json({ status: 404, message: 'Data company not found!' });
          }
        } catch (error) {
            console.error('Terjadi error ketika update profile company', error);
            return res.status(500).json({ status: 500, message: 'Update profile company failed!' });
        }
    }
  };
  
  module.exports = companyController;  