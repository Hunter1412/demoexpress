const mongoose = require('mongoose');
module.exports = async () => {
    await mongoose.connect('mongodb://127.0.0.1:2718/mydb', { useNewUrlParser: true })
        .then(() => console.log('Connected Successfully'))
        .catch((err) => console.error('Not Connected', err));
}