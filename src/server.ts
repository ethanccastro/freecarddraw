import { initMiddleware } from './server-init.js';
import { config } from "../config.js";
import express from "express";

const app = express();

try {
    await initMiddleware(app);
    
    app.listen(3000, () => {
        console.log(`The server is running at http://localhost:${config.port}`);
    })

} catch(error) {
    console.log(error);
}
