import fs from "fs";
import csv from "csvtojson";
import { pipeline } from "stream";

const csvFilePath = "./task-1.3/csv/task-1.3.csv";
const outputFilePath = "./task-1.3/csv/task-1.3.txt";

const errorHandler = (err) => {
  if (err) {
    console.log("There was an error");
  } else {
    console.log("Pipeline Succeeded");
  }
};

const csvConverter = () => {
  pipeline(
    fs.createReadStream(csvFilePath),
    csv(),
    fs.createWriteStream(outputFilePath),
    errorHandler
  );
};

export { csvConverter };
