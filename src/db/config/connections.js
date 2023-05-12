const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vacayte2', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return mongoose.connection
}

module.exports = dbConnect;
