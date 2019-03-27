const axios = require('axios');
const net = require('net');
var fs = require('fs');


const getFlow = (flowName) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = fs.readFileSync(`./src/flows/${flowName}.json`);
            const obj = JSON.parse(data);
            resolve(obj);
        }, 300);
    });
};

const saveFlow = (flowName,flowItems) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.writeFileSync(`./src/flows/${flowName}.json`, JSON.stringify(flowItems));
            resolve(true);
        }, 300);
    });
};

module.exports = {
    getFlow,
    saveFlow
}
