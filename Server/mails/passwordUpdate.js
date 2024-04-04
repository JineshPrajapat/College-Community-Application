exports.passwordUpdated = (email, name) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Updated Email</title>
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
      max-width: 200px;
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
    <a href=""><img class="logo" src="./logo.png" alt="CampusConnect Logo" /></a>
    <div class="message">Your Password Updated Successfully</div>
    <div class="body">
      <p class="highlight">Dear ${name},</p>
      <p class="para">
        Your password has been updated successfully. If you did not initiate this change, please contact us immediately.
      </p>
    </div>
    <div class="support">
      If you have any questions or need further assistance, please feel free to reach us at
      <a href="mailto:info@CampusConnect.com">info@CampusConnect.com</a>. We are here to help!
    </div>
  </div>
</body>
</html>
`;
};
