export const confirmationTemplate = (verificationLink: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Confirm Your Email</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style type="text/css">
        :root {
            --fd-bg-dark: #0D1A2B;
            --fd-bg-med: #182C47;
            --fd-bg-light: #2A4162;
            --fd-blue-accent: #1575E0;
            --fd-border: #2A4162;
            --text-primary: #FFFFFF;
            --text-secondary: #9DA9B4;
            --accent-green: #2ECC71;
            --winner-gold: #f1c40f;
            --danger-red: #e74c3c;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--fd-bg-dark);
            margin: 0;
            padding: 0;
            color: var(--text-primary);
            line-height: 1.6;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table {
            border-spacing: 0;
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        td {
            padding: 0;
        }

        .email-wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: var(--fd-bg-dark);
            padding: 20px 0;
        }

        .email-container {
            background-color: var(--fd-bg-med);
            padding: 2.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            width: 90%;
            max-width: 600px;
            text-align: center;
            border: 1px solid var(--fd-border);
            margin: 0 auto;
        }

        h1 {
            color: var(--fd-blue-accent);
            margin-bottom: 1.5rem;
            font-weight: 600;
            font-size: 1.8rem;
        }

        p {
            color: var(--text-primary);
            line-height: 1.7;
            margin-bottom: 1.5rem;
            font-size: 1rem;
        }

        .verify-button {
            display: inline-block;
            background-color: var(--fd-blue-accent);
            color: var(--text-primary);
            padding: 0.9rem 1.5rem;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: background-color 0.2s ease;
            border: none;
            cursor: pointer;
        }

        .verify-button:hover {
            background-color: #3498db;
        }

        .footer {
            margin-top: 2.5rem;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            .email-container {
                padding: 1.5rem;
            }
            
            h1 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" class="email-wrapper">
        <tr>
            <td align="center">
                <table role="presentation" class="email-container">
                    <tr>
                        <td>
                            <h1>Confirm Your Email</h1>
                            <p>To finalize your entry and receive your unique giveaway number, please confirm your email address by clicking the button below:</p>
                            <a href="${verificationLink}" class="verify-button">Confirm Email</a>
                            <p>If you did not enter the giveaway, please disregard this email.</p>
                            <div class="footer">
                                <p>Thank you for participating!</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`; 