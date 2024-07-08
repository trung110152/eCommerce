'use strict'

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;

const countConnect = () => {
    const numConnect = mongoose.connections.length;
    console.log(`Number of Connections::${numConnect}`);
};
//check overload
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        //example max number of connections based number of cores
        const maxConnections = numCores * 5;
        console.log(`Active connection: ${numConnection}`);
        console.log((`Memory usage: ${ memoryUsage / 1024 / 1024 } MB`));

        if( numConnection > maxConnections ) {
            console.log(`Connection overload detected`)
        }

    }, _SECONDS); //monitor every 5 seconds
}


module.exports = { countConnect, checkOverload };