// constructor(){
//     this.Url = 'mongodb://localhost:27017/notaty';
// }

// connect(){
//     mongoose.connect(this.Url)
//     .then(() => {
//         console.log('✅ Connected to database');
//     })
//     .catch((err) => {
//         console.log('❌ Database connection error:', err);
//     });
// }

const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/notaty';

mongoose
    .connect(MONGO_URL)
    .then(()=>{
        console.log('✅ Connected to database');
    }).catch((err)=>{
        console.log('❌ Database connection error:', err);
    });

module.exports = mongoose;