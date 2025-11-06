const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


// connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_job_portal');


app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
