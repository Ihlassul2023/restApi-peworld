const {
  getRegisterUser,
  validateByEmail,
  postRegisterUser,
} = require('../model/authModel');

const {hashPassword, verifyPassword} = require('../middleware/bcrypt')

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
        photo: '',
        photo_id: '',
        validate: '',
      };

      const result = await postRegisterUser(post);
      if (result) {
        console.log('Hasil register user', result.rows);
        return res.status(200).json({
          status: 200,
          message: 'Registration success!',
          data: result.rows,
        });
      }
    } catch (error) {
      console.error('Error saat register user', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Registration error!' });
    }
  },
};

module.exports = authController;
