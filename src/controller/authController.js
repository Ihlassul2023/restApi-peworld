import { postRegisterUser } from '../model/authModel';

const authController = {
  registerUser: async (req, res) => {
    console.log('Control: Running register users');
    try {
      const { name, email, phone, password, photo, photo_id } = req.body;

      let post = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        photo: photo,
        photo_id: photo_id,
      };

      const result = await postRegisterUser(post);
      if (result) {
        console.log(result.rows);
        return res
          .status(200)
          .json(result, 'Registration success!');
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json(error, 'Registration error!');
    }
  },
};

module.exports = authController
