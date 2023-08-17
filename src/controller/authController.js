const {
  getRegisterUser,
  getUserById,
  validateByEmail,
  postRegisterUser,
  putUserById
} = require('../model/authModel');

const {hashPassword, verifyPassword} = require('../middleware/bcrypt')
const cloudinary = require('../config/cloudinary');
const {generateToken} = require('../middleware/jwt')

const authController = {
  getUser: async (req, res) => {
    try {
      const result = await getRegisterUser();
      if (result.rows.length > 0) {
        console.log('Hasil get user', result.rows);
        return res.status(200).json({
          status: 200,
          message: 'Get register user success!',
          data: result.rows,
        });
      } else {
        console.log('Data tidak ditemukan');
        return res
          .status(404)
          .json({ status: 404, message: 'Data register user not found!' });
      }
    } catch (error) {
      console.error('Error saat get user:', error.message);
      return res.status(500).json({ status: 500, message: 'Get user error!' });
    }
  },
  registerUser: async (req, res) => {
    try {
      const { name, email, phone, company, position, password } = req.body;

      if (!name || !email || !phone || !password) {
        return res
          .status(404)
          .json({
            status: 404,
            message: 'Name, email, phone, password must be filled!',
          });
      }

      let user = await validateByEmail(email);
      if (user.rows[0]) {
        return res
          .status(404)
          .json({
            status: 404,
            message: 'Email has been registered, try another email!',
          });
      }

      let post = {
        name: name,
        email: email,
        phone: phone,
        company: company,
        position: position,
        password: await hashPassword(password),
        validate: '',
      };

      if (req.file) {
        const result_up = await cloudinary.uploader.upload(req.file.path, { folder: 'HireJob' });
        console.log('Ini adalah hasil cloudinary', result_up);

        post.photo = result_up.secure_url;
        post.photo_id = result_up.public_id;
      } else {
        post.photo = 'https://i.ibb.co/M2JSRmW/noimage.png';
        post.photo_id = 'no_image';
      }


      const result = await postRegisterUser(post);
      if (result) {
        console.log('Hasil register user', result.rows);
        return res.status(200).json({
          status: 200,
          message: 'Registration success!',
          data: result.rows[0],
        });
      }
    } catch (error) {
      console.error('Error saat register user', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Registration error!' });
    }
  },
  login: async (req, res)=>{
    try {
      let {email, password} = req.body
      console.log('input email and password', email, password)

      if(!email || !password){
          return res.status(404).json({ status: 404, message: 'Email and password must be filled!' })
      }

      let data = await validateByEmail(email)

      if(!data.rows[0]){
          return res.status(404).json({ status: 404, message: 'Email not registered!' })
      }

      let user = data.rows[0]
      
      const isPasswordMatch = await verifyPassword(password, user.password)
      if(isPasswordMatch){
        delete user.password
        const token = generateToken(user)
        user.token = token
        return res.status(200).json({
          status: 200,
          message: 'Login success!',
          data: user,
        })
      } else {
        return res.status(404).json({ status: 404, message: 'Input data is wrong!' })
      }
    } catch (error) {
      console.error('error ketika login', error)
      res.status(500).json({ status: 500, message: 'Login is failed!' })
    }
  },
  editUser: async (req, res) => {
    try {
    const {id} = req.params
    const {name, email, phone, company, position, password} = req.body

    let dataUser = await getUserById(id);
    let result_up = null;

    if (req.file) {
        // Jika req.file ada, upload gambar baru dan delete gambar lama
        result_up = await cloudinary.uploader.upload(req.file.path, { folder: 'HireJob' });
        await cloudinary.uploader.destroy(dataUser.rows[0].photo_id);
    }

    let post = {
      id: id,
      name: name,
      email: email,
      phone: phone,
      company: company,
      position: position,
      password: await hashPassword(password)
    }

    if (result_up) {
      // Jika gambar baru diupload, update properti image
        post.photo = result_up.secure_url;
        post.photo_id = result_up.public_id;
    } else {
        // Jika tidak ada gambar baru diupload, ambil gambar yang masih ada
        post.photo = dataUser.rows[0].photo;
        post.photo_id = dataUser.rows[0].photo_id;
    }

    let user_id = req.payload.id
    // return (console.log('cek user_id', user_id))
    // return (console.log('cek dataUser', dataUser.rows[0].id))
      
    if(user_id != dataUser.rows[0].id){
        return res.status(404).json({ status: 404, message: 'This not your profile company!' })
    }

    const result = await putUserById(post);
      if (result.rowCount > 0) {
          console.log('ini hasil update', result.rows[0]);
          return res.status(200).json({
            status: 200,
            message: 'Edit profile company success!',
            data: result.rows[0],
          });
      } else {
          console.log('Cant find data')
          return res.status(404).json({ status: 404, message: 'Data company not found!' });
      }
    } catch (error) {
        console.error('Error saat update data company', error);
        return res.status(500).json({ status: 500, message: 'Error when update data company!'});
    }
  }
};

module.exports = authController;
