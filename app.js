const express = require('express');
const { required } = require('joi/lib/types/symbol');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_LOCAL_URI, { useUnifiedTopology: true, useNewUrlParser: true });


const app = express();


app.use(morgan('dev'));
app.use(express.json());



app.use('/users',require('./routes/users'))




const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
})