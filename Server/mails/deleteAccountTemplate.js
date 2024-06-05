exports.deleteTemplate = (username) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Account Deletion Confirmation</title>
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
                text-align: left;
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
            <a href="https://ctae-website.vercel.app/">
                <img class="logo" src="https://res.cloudinary.com/dqvkis3qg/image/upload/v1717553664/CollegeChat/mainLogo1_lzcrbc.png" alt="Let's Chat Logo"/>
            </a>
            <div class="message">Account Deletion Confirmation</div>
            <div class="body">
                <p>Dear ${username},</p>
                <p class="para">
                    We hope this email finds you well. We noticed that you recently deleted your account from our website, and while we respect your decision, we couldn't let you go without expressing our gratitude for being a part of our community.
                </p>
                <p class="para">
                    Your presence and engagement meant a lot to us, and we want to take a moment to thank you for your support and participation. We've appreciated every interaction, contribution, and feedback you've shared with us.
                </p>
                <p class="para">
                    While we understand that circumstances change and priorities shift, we want you to know that you'll always have a place here should you decide to return. Our doors are open, and we'd be thrilled to welcome you back with open arms.
                </p>
                <p class="para">
                    In the meantime, if there's anything we can do to improve your experience or if you have any further feedback to share, please don't hesitate to reach out. Your input is invaluable to us, and we're committed to continuously enhancing our platform for all our users.
                </p>
                <p class="para">
                    Thank you once again for being a part of our journey. We wish you all the best in your future endeavors and hope our paths cross again someday.
                </p>
            </div>
            <div class="info">
                Warm regards,<br />
                [Your Name]<br />
                [Your Position/Title]<br />
                [Your Company/Organization]<br />
                [Contact Information]
            </div>
        </div>
    </body>
    </html>
    `;
};
