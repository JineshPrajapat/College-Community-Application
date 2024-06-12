exports.ContactTemplate = (name, message, phoneNumber, fromEmail) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .logo {
            max-width: 50px;
            margin-bottom: 20px;
            border: none;
            border-radius: 30px;
        }
        .container {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
        }
        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333333;
        }
        p {
            color: #555555;
            line-height: 1.6;
        }
        .contact-details {
            margin-top: 20px;
        }
        .contact-details span {
            display: block;
            color: #777777;
        }
        @media (max-width: 768px) {
            .email-content {
                padding: 15px;
            }
        }
        @media (max-width: 480px) {
            .email-content {
                padding: 10px;
            }
        }
        .support {
            font-size: 14px;
            color: #9d8f8f;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="https://ctae-website.vercel.app/"><img class="logo" src="https://res.cloudinary.com/dqvkis3qg/image/upload/v1717553664/CollegeChat/mainLogo1_lzcrbc.png" alt="Let's Chat Logo"/></a>
        <div class="email-content">
            <h2>Contact Message from ${name}</h2>
            <p>${message}</p>
            <div class="contact-details">
                <span>Email: ${fromEmail}</span>
                <span>Phone Number: ${phoneNumber}</span>
            </div>
            <div class="support">
                If you have any questions or need futher assistance, please feel free to
                reach us at
                <a href="mailto:college.chat242@gmail.com">info@Letschat.com</a>. We
                are here to help!
            </div>
        </div>
    </div>
</body>
</html>
`
};