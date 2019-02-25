const mongoose = require('mongoose');

mongoose.connect(process.env.DB_LINK, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log(`Connected to mongoDB at ${db.host}:${db.port}`);
});