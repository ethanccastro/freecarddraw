import 'dotenv/config';
import { initMiddleware } from './server-init.js';
import express from "express";
import './services/workerthread.js';  // Import the worker thread

const app = express();

try {
    await initMiddleware(app);
    
    app.listen(3000, () => {
        console.log(`The server is running at http://localhost:${process.env.PORT}`);
    })

} catch(error) {
    console.log(error);
}
