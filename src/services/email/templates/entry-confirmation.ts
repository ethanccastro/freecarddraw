export const entryConfirmationTemplate = (verificationLink: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Confirm Your Email</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style type="text/css">
        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--fd-bg-dark);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .email-container {
            background-color: var(--fd-bg-med);
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 600px;
            text-align: center;
            border: 1px solid var(--fd-border);
        }

        h1 {
            color: var(--fd-blue-accent);
            margin-bottom: 20px;
            font-weight: 600;
        }

        p {
            color: var(--text-primary);
            line-height: 1.6;
            margin-bottom: 30px;
        }

        .verify-button {
            display: inline-block;
            background-color: var(--fd-blue-accent);
            color: var(--text-primary);
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            transition: background-color 0.3s;
        }

        .verify-button:hover {
            background-color: #3498db;
        }

        .footer {
            margin-top: 40px;
            color: var(--text-secondary);
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>Confirm Your Email</h1>
        <p>To finalize your entry and receive your unique giveaway number, please confirm your email address by clicking the button below:</p>
        <a href="${verificationLink}" class="verify-button">Verify Email</a>
        <p>If you did not enter the giveaway, please disregard this email.</p>
        <div class="footer">
            <p>Thank you for participating!</p>
        </div>
    </div>
</body>
</html>`; 