const express = require("express");
const app = express();
const company = require("./src/router/companyRouter");
const worker = require("./src/router/workerRouter");
const experience = require("./src/router/experienceRoute");
const skill = require("./src/router/skillRouter");
const portfolio = require("./src/router/portfolioRouter");
const cors = require('cors');

// Gunakan middleware cors untuk mengizinkan permintaan dari asal yang berbeda
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ info: "HireJob API v.1.0.0", Group: 3, Member: ["Ihlas Sul Akbar", "Muhammad Faisal", "Farhan Rizki", "Mohamad Yasin Fadilah", "Mahardhika Putra Pratama"] });
});

app.use(company);
app.use(worker);
app.use(experience);
app.use(skill);
app.use(portfolio);

app.listen(4000, () => {
  console.log(`App running on http://localhost:4000`);
});
