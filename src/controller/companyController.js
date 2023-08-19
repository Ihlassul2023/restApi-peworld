const { getRegisterCompany, getCompanyById, checkEmailCompany, postRegisterCompany, putCompanyById, deleteAccountCompany } = require("../model/companyModel");

const { hashPassword, verifyPassword } = require("../middleware/bcrypt");
const cloudinary = require("../config/cloudinary");
const { generateToken } = require("../middleware/jwt");

const authController = {
  getCompany: async (req, res) => {
    try {
      const result = await getRegisterCompany();
      if (result.rows.length > 0) {
        console.log("Hasil get company", result.rows);
        return res.status(200).json({
          status: 200,
          message: "Get register company success!",
          data: result.rows,
        });
      } else {
        console.log("Data perusahaan tidak ditemukan");
        return res.status(404).json({ status: 404, message: "Data register company not found!" });
      }
    } catch (error) {
      console.error("Error saat get company:", error.message);
      return res.status(500).json({ status: 500, message: "Get data company error!" });
    }
  },
  getMyCompany: async (req, res) => {
    try {
      const { id } = req.payload;
      const result = await getCompanyById(parseInt(id));
      if (result.rows.length > 0) {
        console.log("Hasil get company", result.rows);
        return res.status(200).json({
          status: 200,
          message: "Get register company success!",
          data: result.rows[0],
        });
      } else {
        console.log("Data perusahaan tidak ditemukan");
        return res.status(404).json({ status: 404, message: "Data register company not found!" });
      }
    } catch (error) {
      console.error("Error saat get company:", error.message);
      return res.status(500).json({ status: 500, message: "Get data company error!" });
    }
  },
  registerCompany: async (req, res) => {
    try {
      const { name, email, phone, company_name, position, password, confirm_password } = req.body;

      if (!name || !email || !phone || !company_name || !position || !password || !confirm_password) {
        return res.status(404).json({
          status: 404,
          message: "Name, email, phone, password must be filled!",
        });
      } else if (password != confirm_password) {
        return res.status(404).json({ message: "Password and confirmation password do not match." });
      }

      let user = await checkEmailCompany(email);
      if (user.rows[0]) {
        return res.status(404).json({
          status: 404,
          message: "Email has been registered, try another email!",
        });
      }

      let post = {
        name,
        email,
        phone,
        company_name,
        position,
        password: await hashPassword(password),
        validate: "diisi token validasi nanti",
      };

      if (req.file) {
        const result_up = await cloudinary.uploader.upload(req.file.path, { folder: "HireJob" });
        console.log("Ini adalah hasil cloudinary company", result_up);

        post.photo = result_up.secure_url;
        post.photo_id = result_up.public_id;
      } else {
        post.photo = "https://i.ibb.co/M2JSRmW/noimage.png";
        post.photo_id = "no_image";
      }

      const result = await postRegisterCompany(post);
      if (result) {
        console.log("Hasil register perusahaan", result.rows);
        return res.status(200).json({
          status: 200,
          message: "Registration company success!",
          data: result.rows[0],
        });
      }
    } catch (error) {
      console.error("Error saat register perusahaan", error.message);
      return res.status(500).json({ status: 500, message: "Registration company error!" });
    }
  },
  loginCompany: async (req, res) => {
    try {
      let { email, password } = req.body;
      console.log("input email and password", email, password);

      if (!email || !password) {
        return res.status(404).json({ status: 404, message: "Email and password must be filled!" });
      }

      let data = await checkEmailCompany(email);

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
  editCompany: async (req, res) => {
    try {
      const { id } = req.payload.id;
      const { name, email, phone, company_name, position, password, sector, province, city, description, email_hrd, email_corp, linkedin } = req.body;

      let dataUser = await getCompanyById(id);
      // return (console.log('cek user_id', user_id))
      // return (console.log('cek dataUser', dataUser.rows[0].id))

      if (id != dataUser.rows[0].id) {
        return res.status(404).json({ status: 404, message: "This not your profile company!" });
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
        company_name: company_name || dataUser.rows[0].company_name,
        position: position || dataUser.rows[0].position,
        password: password ? await hashPassword(password) : dataUser.rows[0].password,
        sector: sector || dataUser?.rows[0].sector || "",
        province: province || dataUser?.rows[0].province || "",
        city: city || dataUser?.rows[0].city || "",
        description: description || dataUser?.rows[0].description || "",
        email_hrd: email_hrd || dataUser?.rows[0].email_hrd || "",
        email_corp: email_corp || dataUser?.rows[0].email_corp || "",
        linkedin: linkedin || dataUser?.rows[0].linkedin || "",
      };

      if (result_up) {
        // Jika gambar baru diupload, update properti image
        post.photo = result_up.secure_url;
        post.photo_id = result_up.public_id;
      } else {
        // Jika tidak ada gambar baru diupload, ambil gambar yang masih ada
        post.photo = dataUser?.rows[0].photo;
        post.photo_id = dataUser?.rows[0].photo_id;
      }

      const result = await putCompanyById(post);
      if (result.rowCount > 0) {
        console.log("ini hasil update", result.rows[0]);
        return res.status(200).json({
          status: 200,
          message: "Edit profile company success!",
          data: result.rows[0],
        });
      } else {
        console.log("Cant find data");
        return res.status(404).json({ status: 404, message: "Data company not found!" });
      }
    } catch (error) {
      console.error("Error saat update data company", error);
      return res.status(500).json({ status: 500, message: "Error when update data company!" });
    }
  },
  deleteAccount: async (req, res) => {
    console.log("Control: Running delete company account");
    try {
      let user_id = req.payload.id;
      // return (console.log(user_id))
      let dataCompany = await getCompanyById(user_id);

      if (user_id != dataCompany.rows[0].id) {
        return res.status(404).json({ status: 404, message: "This not your profile company!" });
      }

      if (req.file) {
        await cloudinary.uploader.destroy(dataCompany.rows[0].photo_id);
      }

      const result = await deleteAccountCompany(user_id);
      if (result.rowCount > 0) {
        console.log(result.rows);
        return res.status(200).json({ status: 200, message: "Delete success!" });
      } else {
        console.log("Data tidak ditemukan");
        return res.status(404).json({ status: 404, message: "Data not found!" });
      }
    } catch (error) {
      console.error(`Error : ${error.message}`);
      return res.status(500).json({ status: 500, message: "Failed to delete account" });
    }
  },
};

module.exports = authController;
