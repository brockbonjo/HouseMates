const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://housemates:${process.env.DB_PASSWORD}@housemates-cluster-rhjyg.mongodb.net/test?retryWrites=true`, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log(`Connected to mongoDB at ${db.host}:${db.port}`);
});