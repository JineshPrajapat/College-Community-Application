exports.registrationTemplate = (username) => {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration Confirmation Email</title>
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
      <a href=""><img class="logo" src="./your-logo.png" alt="Your Logo" /></a>
      <div class="message">Registration Confirmation</div>
      <div class="body">
        <p>Dear ${username},</p>
        <p class="para">
          Welcome aboard! We are thrilled to have you join our community at [Website Name]. Your registration marks the beginning of an exciting journey filled with opportunities to discover, connect, and thrive.
        </p>
        <p class="para">
          Here's what you can look forward to:
        </p>
        <ul class="paras">
          <li>Tailored Recommendations: Discover personalized content, recommendations, and resources curated just for you.</li>
          <li>Engaging Community: Join a dynamic community of individuals who share your interests, engage in meaningful discussions, and collaborate on exciting projects.</li>
          <li>Exclusive Access: Gain access to exclusive events, promotions, and insider perks available only to members of our community.</li>
          <li>Continuous Learning: Fuel your curiosity and expand your horizons with a wealth of educational resources, workshops, and interactive experiences.</li>
          <li>Empowering Tools: Take advantage of powerful tools and features designed to enhance your experience and maximize your productivity.</li>
        </ul>
        <p class="para">
          Get ready to embark on an unforgettable journey of discovery, connection, and growth. We can't wait to see what you'll achieve and create within our community.
        </p>
        <p class="para">
          If you have any questions, feedback, or suggestions, don't hesitate to reach out to our friendly support team. We're here to ensure that your experience exceeds your expectations every step of the way.
        </p>
      </div>
      <div class="info">
        For any further assistance or inquiries, please contact us at <a href="mailto:contact@yourwebsite.com">contact@yourwebsite.com</a>.
      </div>
      <div class="info">
        You can also visit our website for more information and security tips: <a href="https://yourwebsite.com">Your Website</a>.
      </div>
    </div>
  </body>
</html>
`;
};
