import * as fs from 'fs';
import * as XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function excelToJson(filePath) {
    var data = fs.readFileSync(filePath);
    var workbook = XLSX.read(data, {type: 'buffer'});
    var sheetName = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[sheetName];
    var jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

    var keys = jsonData[0];
    var data = jsonData.slice(1).map(function(row) {
        var obj = {};
        keys.forEach(function(key, index) {
            obj[key] = row[index];
        });
        return obj;
    });

    return data;
}

// Assuming data is your JSON object
let filePath = path.resolve(__dirname, 'Matsya_Options_Trade_Monthly.xlsx');
let jsonData = JSON.stringify(excelToJson(filePath), null, 2);

fs.writeFile('options_book.json', jsonData, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
