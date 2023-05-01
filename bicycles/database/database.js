require('dotenv').config('./.env');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connection successful!');
}).catch((e) => {
    console.log('Connection failed!');
    console.log(e);
})