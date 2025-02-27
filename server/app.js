import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import customerRouter from './routes/customer.route.js'


const app = express();
dotenv.config()
const port = process.env.PORT
// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

connectDB()

app.use('/customers', customerRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
