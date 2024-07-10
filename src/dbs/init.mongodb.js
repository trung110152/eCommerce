'use strict'

const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');
const { db:{host, port, name} } = require('../configs/config.mongodb');

const connectString = `mongodb://${host}:${port}/${name}`;
class Database {
    constructor () {
        this.connect();
    }

    connect(type = 'mongodb') {
        // if(1 === 1){
        //     mongoose.set('debug', true);
        //     mongoose.set('debug', {color: true});
        // };
        mongoose.connect( connectString, {
            maxPoolSize : 50 // The maximum number of connections that the connection pool can maintain at one time
        } ).then( _=>{
            console.log(`Connected MongoDB Success: ${connectString}`);
            countConnect();
        }
            )
        .catch( err => console.error('Connection error:', err));
    }
    // Trien khai Singleton dam bao chi tao 1 doi tuong duy nhat, chi co 1 ket noi toi dbs
    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database();
        };

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;


