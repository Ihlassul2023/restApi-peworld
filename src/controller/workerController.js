const {
    getProfileWorker,
    getWorkerById,
    postProfileWorker,
    putWorkerById
  } = require('../model/workerModel');
  
  const workerController = {
    getProfile: async (req, res) => {
      try {
        const result = await getProfileWorker();
        if (result.rows.length > 0) {
          console.log('Hasil get profile worker', result.rows);
          return res.status(200).json({
            status: 200,
            message: 'Get profile worker success!',
            data: result.rows,
          });
        } else {
          console.log('Data pekerja tidak ditemukan');
          return res
            .status(404)
            .json({ status: 404, message: 'Data pekerja not found!' });
        }
      } catch (error) {
        console.error('Error saat get worker:', error.message);
        return res.status(500).json({ status: 500, message: 'Get worker error!' });
      }
    },
    getWorkerId: async (req, res) => {
      try {
        const {id} = req.params
        const result = await getWorkerById(id);
        if (result.rows.length > 0) {
          console.log('Hasil get worker by id', result.rows[0]);
          return res.status(200).json({
            status: 200,
            message: 'Get profile worker success!',
            data: result.rows[0],
          });
        } else {
          console.log('Data pekerja tidak ditemukan');
          return res
            .status(404)
            .json({ status: 404, message: 'Data worker not found!' });
        }
      } catch (error) {
        console.error('Error saat get worker:', error.message);
        return res.status(500).json({ status: 500, message: 'Get worker error!' });
      }
    },
    postProfile: async (req, res) => {
      try {
        const {name, jobdesk, address, office, description} = req.body;

        let user_id =  req.payload.id
        // return(console.log('decode',user_id))

        let post = {
          name: name,
          jobdesk: jobdesk,
          address: address,
          office: office,
          description: description,
          experience_id: user_id,
          portofolio_id: user_id,
          skill_id: user_id,
          user_id
        };

        const result = await postProfileWorker(post);
        if (result) {
          console.log('Hasil post worker profile', result.rows[0]);
          return res.status(200).json({
            status: 200,
            message: 'Post profile worker success!',
            data: result.rows[0],
          });
        }
      } catch (error) {
        console.error('Error saat post profile worker', error.message);
        return res
          .status(500)
          .json({ status: 500, message: 'Post profile worker error!' });
      }
    },
    updateProfile: async (req, res) => {
        console.log('Control: Running update profile worker')
        try {
        const {id} = req.params
        const {name, jobdesk, address, office, description} = req.body;

        let dataCompany = await getWorkerById(id)

        let post = {
          id: id,
          name: name || dataCompany.rows[0].name,
          jobdesk: jobdesk || dataCompany.rows[0].jobdesk,
          address: address || dataCompany.rows[0].address,
          office: office || dataCompany.rows[0].office,
          description: description || dataCompany.rows[0].description
        }

        let user_id =  req.payload.id

        // return (console.log('Update check', company_id))

        if(user_id != dataCompany.rows[0].user_id){
            return res.status(404).json({ status: 404, message: 'This is not your profile!' })
        }

        const result = await putWorkerById(post);
          if (result.rowCount > 0) {
              console.log(result.rows);
              return res.status(200).json({
                status: 200,
                message: 'Update profile worker success!',
                data: result.rows[0],
              });
          } else {
              console.log('Data worker tidak ditemukan')
              return res.status(404).json({ status: 404, message: 'Data worker not found!' });
          }
        } catch (error) {
            console.error('Terjadi error ketika update profile worker', error);
            return res.status(500).json({ status: 500, message: 'Update profile worker failed!' });
        }
    }
  };
  
  module.exports = workerController;  