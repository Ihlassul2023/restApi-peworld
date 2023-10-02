<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="https://res.cloudinary.com/dmx0spvee/image/upload/v1695873714/hire-job/logo-peworld_qcolfj.png" alt="Logo PeWorld" width="200px">
  </a>

  <h3 align="center">Hire Job</h3>

  <p align="center">
    <a href="https://client-peworld.vercel.app/">Demo Web</a>
    -
    <a href="https://github.com/Ihlassul2023/restApi-peworld/issues">Report Bug</a>
    -
    <a href="https://github.com/Ihlassul2023/restApi-peworld/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About Us</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#screenshoots">Screenshots</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#related-project">Related Project</a></li>
    <li><a href="#our-team">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

**PeWorld Hire Job** is a simple job website that can facilitating company to recruit talented programmer based on skills that company needed. It also provide programmer to show their portofolio so they can get recruited by some company.

### Built With

This app was built with some technologies below:

- [Express.js](https://expressjs.com/)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node JS](https://nodejs.org/en)
- [Nodemailer](https://nodemailer.com/)
- [Cloudinary](https://cloudinary.com/)

Database

- [PostgreSQL](https://www.postgresql.org/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Before going to the installation stage there are some software that must be installed first.

- [NodeJs v18.00^](https://nodejs.org/en/download/)

### Installation

If you want to run this project locally, I recommend you to configure the [front-end](https://github.com/Ihlassul2023/client-peworld) first before configuring this repo back-end.

- Clone the repo

```
git clone https://github.com/Ihlassul2023/restApi-peworld.git
```

- Go to repo

```
cd restApi-peworld
```

- Install module

```
npm install
```

- Setup .env

```
USER=
HOST=
DATABASE=
PASSWORD=
PORT=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
SECRET=
EMAIL_NAME=
EMAIL_PASS=
BASE_URL=(for link api)
```

- Type `nodemon index.js` To Start the local web

## Screenshoots

<p align="center" display=flex>
<!-- table for register recruiter and register worker -->
<table>
<tr>
  <td align='center'><b>Register Recruiter</b></td>
  <td align='center'><b>Register Worker</b></td>
</tr>
<tr>
  <td>
    <image src="https://res.cloudinary.com/dmx0spvee/image/upload/v1695873631/hire-job/register-recruiter_tmnmkg.png" alt="Register Page" width=100%>
  </td>
  <td>
    <image src="https://res.cloudinary.com/dmx0spvee/image/upload/v1695873631/hire-job/register-worker_ntmfbe.png" alt="Register Page" width=100%>
  </td>
</tr>
</table>
  
<!-- table for login recruiter and register worker -->
<table>
<tr>
  <td align='center'><b>Login Recruiter</b></td>
  <td align='center'><b>Login Worker</b></td>
</tr>
<tr>
  <td>
    <image src="https://res.cloudinary.com/dmx0spvee/image/upload/v1695873630/hire-job/login-recruiter_xnruzu.png" alt="Login Page" width=100%>
  </td>
  <td>
    <image src="https://res.cloudinary.com/dmx0spvee/image/upload/v1695873629/hire-job/login-worker_nsineu.png" alt="Login Page" width=100%>
  </td>
</tr>
</table>

<!-- table for landing page and edit profile worker -->
<table>
<tr>
  <td align='center'><b>Landing Page</b></td>
  <td align='center'><b>Edit Profile Worker</b></td>
</tr>
<tr>
  <td>
    <image src="https://res.cloudinary.com/dmx0spvee/image/upload/v1695873634/hire-job/landing_page_lyrocu.png" alt="Landing Page" width=100%>
  </td>
  <td>
    <image src="https://res.cloudinary.com/dmx0spvee/image/upload/v1695873628/hire-job/edit-profile-worker_dsszui.png" alt="Edit Profile Worker" width=100%>
  </td>
</tr>
</table>

<!-- table for home recruiter and hire talent -->
<table>
<tr>
  <td align='center'><b>Home Recruiter</b></td>
  <td align='center'><b>Hire Talent</b></td>
</tr>
<tr>
  <td>
    <image src="https://res.cloudinary.com/dmx0spvee/image/upload/v1695873627/hire-job/home-recruiter_cnhllx.png" alt="Hire Talent Page" width=100%>
  </td>
  <td>
    <image src="https://res.cloudinary.com/dmx0spvee/image/upload/v1695873627/hire-job/hire-talent_jyrujd.png" alt="Detail Talent Page" width=100%>
  </td>
</tr>
</table>

<!-- table for hire talent and detail talent -->
<table>
<tr>
  <td align='center'><b>Detail Talent</b></td>
  <td align='center'><b>Chat</b></td>
</tr>
<tr>
  <td>
    <image src="https://res.cloudinary.com/dmx0spvee/image/upload/v1695873628/hire-job/detail-talent_g65dcy.png" alt="Detail Talent Page" width=100%>
  </td>
  <td>
    <image src="https://res.cloudinary.com/dmx0spvee/image/upload/v1695873627/hire-job/chat-talent_h5mety.png" alt="Hire Talent Page" width=100%>
  </td>
</tr>
</table>

<!-- end screenshoots -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Add your Changes (`git add .`)
4. Commit your Changes (`git commit -m 'Add some NewFeature'`)
5. Push to the Branch (`git push origin feature/NewFeature`)
6. Open a Pull Request on Github

## Related Project

:books: [`Backend PEWORLD Hire Job`](https://github.com/Ihlassul2023/restApi-peworld)

:books: [`Frontend PEWORLD Hire Job`](https://github.com/Ihlassul2023/client-peworld)

:globe_with_meridians: [`Web Service`](https://pwd.codeinsomnia.com)

:computer: [`Demo Hire Job`](https://client-peworld.vercel.app/)

## Our Team

<table>
  <tr>
    <td align="left">
      <a href="https://github.com/Ihlassul2023">
          <img width="100" src="https://avatars.githubusercontent.com/u/138352540?v=4" alt="Ihlas"><br/>
          <sub><b>Ihlas Sul Akbar</b></sub> <br/>
          <sub>Team Leader | Fullstack Web Developer</sub>
        </a>
    </td>
  </tr>
</table>

<table>
  <tr >
    <td align="left">
      <a href="https://github.com/matfaisall">
          <img width="100" src="https://avatars.githubusercontent.com/u/88364541?v=4" alt="Nisrina Hasna"> <br/>
          <sub><b>Muhammad Faisal</b></sub> <br/>
          <sub>Lead Frontend | Frontend Web Developer</sub>
        </a>
    </td>
    <td align="left">
      <a href="https://github.com/farhanrizqi">
          <img width="100" src="https://avatars.githubusercontent.com/u/129353480?v=4" alt="Farhan Rizki"> <br/>
          <sub><b>Farhan Rizqi A</b></sub> <br/>
          <sub>Frontend Web Developer</sub>
        </a>
    </td>
  </tr>
</table>

<table>
  <tr >
    <td align="left">
      <a href="https://github.com/mahardhikap">
          <img width="100" src="https://avatars.githubusercontent.com/u/21145156?v=4" alt="Mahardhika Pratama"> <br/>
          <sub><b>Mahardhika Putra Pratama</b></sub> <br/>
          <sub>Lead Backend | Backend Web Developer</sub>
        </a>
    </td>
    <td align="left">
      <a href="https://github.com/myfadil">
          <img width="100" src="https://avatars.githubusercontent.com/u/137017147?v=4" alt="Yasin Fadillah"> <br/>
          <sub><b>Mohamad Yasin Fadillah</b></sub> <br/>
          <sub>Backend Web Developer</sub>
        </a>
    </td>
  </tr>
</table>

<sub style="color: red;">\* This is just a title, frontend or backend. Actually, backend and frontend members support each other.</sub>

## License

Distributed under the [MIT](/LICENSE) License.

<p align="right">(<a href="#top">Back to Top</a>)</p>
