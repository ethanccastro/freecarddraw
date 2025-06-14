export const entryNumberTemplate = (entryNumber: number) => `
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Your Entry Number</title>
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

        .entry-number {
            font-size: 2em;
            color: var(--accent-green);
            font-weight: 700;
            margin: 20px 0;
            padding: 15px;
            background-color: var(--fd-bg-dark);
            border-radius: 6px;
            border: 1px solid var(--fd-border);
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
        <h1>Your Entry Number</h1>
        <p>Thank you for confirming your email address. You are now entered into the giveaway!</p>
        <div class="entry-number">${entryNumber}</div>
        <p>Please keep this number safe. You'll need it to check if you've won!</p>
        <div class="footer">
            <p>Good luck!</p>
        </div>
    </div>
</body>
</html>`; 