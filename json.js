const fs = require('fs');
const path = require('path');

const file = path.resolve('cars.json');
console.log(file);
const database = require('./database');
console.log(database.products);
fs.appendFileSync(file, '[');
for (let i = 0; i < database.products.length; i++) {
    const item = database.products[i]
    console.log(item);
    fs.appendFileSync(file, JSON.stringify(item) + ',' + '\n');
}

fs.appendFileSync(file, ']');
