exports.loginTemplate = (username, loginStatus, timestamp, deviceInfo) => {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login Notification Email</title>
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
        font-size: 2rem;
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

      .paras{
        font-size: 1rem;
        text-align: left;
      }

      .info {
        font-size: 14px;
        margin-top: 20px;
      }

      .highlight {
        font-weight: bold;
        color: midnightblue;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="https://ctae-website.vercel.app/"><img class="logo" src="https://res.cloudinary.com/dqvkis3qg/image/upload/v1717553664/CollegeChat/mainLogo1_lzcrbc.png" alt="Your Logo" /></a>
      <div class="message">Login Notification</div>
      <div class="body">
        <p>Dear ${username},</p>
        <p class="para">
          This is to notify you about a recent login attempt on your account.
        </p>
        <p class="paras">
          <span class="highlight">Login Status:</span> ${loginStatus}
        </p>
        <p class="paras">
          <span class="highlight">Timestamp:</span> ${timestamp}
        </p>
        <p class="para">
          <span class="highlight">Device Information</span>
        </p>
        <p class="paras">
          <span class="highlight">Device Type:</span> ${deviceInfo.deviceType}
          </p>
        <p class="paras">
          <span class="highlight">Browser:</span> ${deviceInfo.browser}
        </p>
        <p class="paras">
        <span class="highlight">Platform:</span> ${deviceInfo.platform}
        </p>
        <p class="paras">
          If you did not perform this login or suspect any unauthorized access,
          please take necessary actions to secure your account.
        </p>
      </div>
      <div class="info">
        For any further assistance or inquiries, please contact us at
        <a href="mailto:contact@yourwebsite.com">contact@yourwebsite.com</a>.
      </div>
      <div class="info">
        You can also visit our website for more information and security tips.
        <a href="https://yourwebsite.com">Your Website</a>.
      </div>
    </div>
  </body>
</html>
`;
};
