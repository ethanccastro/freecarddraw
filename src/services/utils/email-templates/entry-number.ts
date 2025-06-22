export const entryNumberTemplate = (entryNumber: number) => `
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Your Entry Number</title>
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

        .website-header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--fd-border);
        }

        .website-name {
            color: var(--fd-blue-accent);
            font-size: 1.5rem;
            font-weight: 700;
            text-decoration: none;
        }

        .website-name:hover {
            color: #3498db;
        }

        .entry-number {
            font-size: 3rem;
            color: var(--accent-green);
            font-weight: 800;
            margin: 2rem 0;
            padding: 2rem;
            background-color: var(--fd-bg-dark);
            border-radius: 8px;
            border: 2px solid var(--accent-green);
            display: inline-block;
            min-width: 250px;
            text-shadow: 0 0 10px rgba(46, 204, 113, 0.3);
            box-shadow: 0 0 20px rgba(46, 204, 113, 0.2);
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

            .entry-number {
                font-size: 1.8rem;
                padding: 1.25rem;
                min-width: 160px;
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
                            <div class="website-header">
                                <a href="https://freecarddraw.com" class="website-name">FreeCardDraw.com</a>
                            </div>
                            <h1>Your Entry Number</h1>
                            <p>Thank you for confirming your email address. You are now entered into the giveaway!</p>
                            <div class="entry-number">${entryNumber}</div>
                            <p>Please keep this number safe. You'll need it to check if you've won!</p>
                            <div class="footer">
                                <p>Good luck!</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`; 