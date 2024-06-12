exports.resetPassword = (email, name, link) => {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification Email</title>
    <link rel="styleSheet" , href="./index.css" />
    <style>
      body {
        background-color: #ffffff;
        font-size: 16px;
        line-height: 1.4;
        color: #333333;
        background-color: wheat;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
      }

      .logo {
            max-width: 50px;
            margin-bottom: 20px;
            border: none;
            border-radius: 30px;
        }

      .message {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 20px;
        text-decoration: underline;
        color: midnightblue;
      }

      .body {
        font-size: 1.5rem;
        margin-bottom: 20px;
      }
      .para {
        font-size: 1rem;
      }

      .support {
        font-size: 14px;
        color: #9d8f8f;
        margin-top: 20px;
      }

      .highlight {
        font-weight: bold;
        color: midnightblue;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="https://ctae-website.vercel.app/"
        ><img class="logo" src="https://res.cloudinary.com/dqvkis3qg/image/upload/v1717553664/CollegeChat/mainLogo1_lzcrbc.png" alt="CampusConnect Logo"
      /></a>
      <div class="message">OTP Verification Email</div>
      <div class="body">
        <p>Dear ${name},</p>
        <p class="para">
          Thank you for registering with Campus-Connect. To complete your
          registration, please use the following OTP (One Time Password) to
          verify your account:
        </p>
        <h2 class="highlight">${link}</h2>
        <p class="para">
          This OTP is valid for 5 minutes. If you did not request this
          verification, please disregard this email. Once your account is
          verified, you will have access to our platform and its features.
        </p>
      </div>
      <div class="support">
        If you have any questions or need futher assistance, please feel free to
        reach us at
        <a href="mailto:college.chat242@gmail.con">info@letschat.com</a>. We
        are here to help!
      </div>
    </div>
  </body>
</html>
`;
};