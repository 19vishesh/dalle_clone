import express from 'express'
import * as dotenv from 'dotenv'        // we use .env for storing passwords and data that donot want to send to server
import cors from 'cors'                 // for security purpose browser block cross-origin resource sharing, so to enable it

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('hello from DALL-E!');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Server started at port 8080"));
    } catch (error) {
        console.log(error)
    }


}
startServer();