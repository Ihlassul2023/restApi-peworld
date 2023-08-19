const { getRegisterWorker, getWorkerById, checkEmailWorker, postRegisterWorker, putWorkerById, deleteAccountWorker } = require("../model/workerModel");

const { hashPassword, verifyPassword } = require("../middleware/bcrypt");
const cloudinary = require("../config/cloudinary");
const { generateToken } = require("../middleware/jwt");

const authController = {
  getWorker: async (req, res) => {
    try {
      const result = await getRegisterWorker();
      if (result.rows.length > 0) {
        console.log("Hasil get worker", result.rows);
        return res.status(200).json({
          status: 200,
          message: "Get register worker success!",
          data: result.rows,
        });
      } else {
        console.log("Data pekerja tidak ditemukan");
        return res.status(404).json({ status: 404, message: "Data register worker not found!" });
      }
    } catch (error) {
      console.error("Error saat get worker:", error.message);
      return res.status(500).json({ status: 500, message: "Get data worker error!" });
    }
  },
  registerWorker: async (req, res) => {
    try {
      const { name, email, phone, password, confirm_password } = req.body;

      if (!name || !email || !phone || !password || !confirm_password) {
        return res.status(404).json({
          status: 404,
          message: "Name, email, phone, password must be filled!",
        });
      } else if (password != confirm_password) {
        return res.status(404).json({ message: "Password and confirmation password do not match." });
      }

      let user = await checkEmailWorker(email);
      if (user.rows[0]) {
        return res.status(404).json({
          status: 404,
          message: "Email has been registered, try another email!",
        });
      }

      let post = {
        name: name,
        email: email,
        phone: phone,
        password: await hashPassword(password),
        validate: "ini untuk token aktivasi",
      };

      if (req.file) {
        const result_up = await cloudinary.uploader.upload(req.file.path, { folder: "HireJob" });
        console.log("Ini adalah hasil cloudinary worker", result_up);

        post.photo = result_up.secure_url;
        post.photo_id = result_up.public_id;
      } else {
        post.photo = "https://i.ibb.co/M2JSRmW/noimage.png";
        post.photo_id = "no_image";
      }

      const result = await postRegisterWorker(post);
      if (result) {
        console.log("Hasil register pekerja", result.rows);
        return res.status(200).json({
          status: 200,
          message: "Registration worker success!",
          data: result.rows[0],
        });
      }
    } catch (error) {
      console.error("Error saat register pekerja", error.message);
      return res.status(500).json({ status: 500, message: "Registration worker error!" });
    }
  },
  loginWorker: async (req, res) => {
    try {
      let { email, password } = req.body;
      console.log("input email and password", email, password);

      if (!email || !password) {
        return res.status(404).json({ status: 404, message: "Email and password must be filled!" });
      }

      let data = await checkEmailWorker(email);

      if (!data.rows[0]) {
        return res.status(404).json({ status: 404, message: "Email not registered!" });
      }

      let user = data.rows[0];

      const isPasswordMatch = await verifyPassword(password, user.password);
      if (isPasswordMatch) {
        delete user.password;
        const token = generateToken(user);
        user.token = token;
        return res.status(200).json({
          status: 200,
          message: "Login success!",
          data: user,
        });
      } else {
        return res.status(404).json({ status: 404, message: "Input data is wrong!" });
      }
    } catch (error) {
      console.error("error ketika login", error);
      res.status(500).json({ status: 500, message: "Login is failed!" });
    }
  },
  editWorker: async (req, res) => {
    try {
      const { name, email, phone, password, jobdesk, address, office, description } = req.body;

      let user_id = req.payload.id;
      let dataUser = await getWorkerById(user_id);
      // return (console.log('cek user_id', user_id))
      // return (console.log('cek dataUser', dataUser.rows[0].id))

      if (user_id != dataUser.rows[0].id) {
        return res.status(404).json({ status: 404, message: "This not your profile worker!" });
      }
      let result_up = null;

      if (req.file) {
        // Jika req.file ada, upload gambar baru dan delete gambar lama
        result_up = await cloudinary.uploader.upload(req.file.path, { folder: "HireJob" });
        await cloudinary.uploader.destroy(dataUser.rows[0].photo_id);
      }

      let post = {
        id: user_id,
        name: name || dataUser.rows[0].name,
        email: email || dataUser.rows[0].email,
        phone: phone || dataUser.rows[0].phone,
        password: (await hashPassword(password)) || dataUser.rows[0].password,
        jobdesk: jobdesk || dataUser.rows[0].jobdesk,
        address: address || dataUser.rows[0].address,
        office: office || dataUser.rows[0].office,
        description: description || dataUser.rows[0].description,
      };

      if (result_up) {
        // Jika gambar baru diupload, update properti image
        post.photo = result_up.secure_url;
        post.photo_id = result_up.public_id;
      } else {
        // Jika tidak ada gambar baru diupload, ambil gambar yang masih ada
        post.photo = dataUser.rows[0].photo;
        post.photo_id = dataUser.rows[0].photo_id;
      }
      const result = await putWorkerById(post);
      if (result.rowCount > 0) {
        console.log("ini hasil update worker", result.rows[0]);
        return res.status(200).json({
          status: 200,
          message: "Edit profile worker success!",
          data: result.rows[0],
        });
      } else {
        console.log("Cant find data worker");
        return res.status(404).json({ status: 404, message: "Data worker not found!" });
      }
    } catch (error) {
      console.error("Error saat update data pekerja", error);
      return res.status(500).json({ status: 500, message: "Error when update data worker!" });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      let dataUser = await getWorkerById(id);
      if (!dataUser.rows[0]) {
        return res.status(404).json({ status: 404, message: "Data worker not found!" });
      }
      return res.status(200).json({ status: 200, data: dataUser.rows[0] });
    } catch (error) {
      console.error("Error saat update data pekerja", error);
      return res.status(500).json({ status: 500, message: "Error when update data worker!" });
    }
  },
  deleteAccount: async (req, res) => {
    console.log('Control: Running delete account worker')
    try {
      let user_id = req.payload.id
      // return (console.log(user_id))
      let dataWorker =  await getWorkerById(user_id)

      if(user_id != dataWorker.rows[0].id){
        return res.status(404).json({ status: 404, message: "This not your profile worker!" })
      }

      if (req.file) {
        await cloudinary.uploader.destroy(dataWorker.rows[0].photo_id);
      }

      const result = await deleteAccountWorker(user_id);
      if (result.rowCount > 0) {
        console.log(result.rows);
        return res.status(200).json({ status: 200, message: "Delete success!" });
      } else {
        console.log('Data tidak ditemukan')
        return res.status(404).json({ status: 404, message: "Data not found!" });
      }
    } catch (error) {
        console.error(`Error : ${error.message}`);
        return res.status(500).json({ status: 500, message: "Failed to delete account" });
    }
  }
};

module.exports = authController;
