import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

const app = express();
const PORT=process.env.PORT

dotenv.config()
// Middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
