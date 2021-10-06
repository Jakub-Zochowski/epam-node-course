const fs = require('fs');
const csv = require('csvtojson');
const { pipeline } = require('stream');

const csvFilePath = './task-1.3/csv/task-1.3.csv';
const outputFilePath = './task-1.3/csv/task-1.3.txt';

const csvConverter = () => {
	pipeline(
		fs.createReadStream(csvFilePath),
		csv(),
		fs.createWriteStream(outputFilePath),
		(err) => {
			if (err) {
				console.log('There was an error');
			} else {
				console.log('Pipeline Succeeded')
			}
		}
	)
}

module.exports = csvConverter;


