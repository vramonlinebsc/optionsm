<<<<<<< HEAD
import fs from 'fs';
import { format } from 'date-fns';

// Read the JSON file
const inputFileName = 'processed_output_reference_2023-12-04T133615344Z.json';
const jsonString = fs.readFileSync(inputFileName, 'utf-8');
let data = JSON.parse(jsonString);

// Define the substitutions for property values
const valueSubstitutions = {
    'BANKNIFTY': 'NSEBANK',
    'IDFCFIRSTB': 'IDFCF'
};

// Recursive function to perform substitutions for property values
const substitutePropertyValues = (obj) => {
    for (const key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            // Recursively apply substitutions for nested objects
            substitutePropertyValues(obj[key]);
        } else if (key === 'TICKER_NAME' && obj[key] in valueSubstitutions) {
            obj[key] = valueSubstitutions[obj[key]];
        }
    }
};

// Apply substitutions to property values
substitutePropertyValues(data);

// Generate timestamp in YYYY_MM_DD-HH_mm_ss format
const timestamp = format(new Date(), 'yyyy_MM_dd-HH_mm_ss');

// Define the output filename
const outputFileName = `traded_universe_${timestamp}.json`;

// Write the modified data to the output file without the outer square brackets
fs.writeFileSync(outputFileName, JSON.stringify(data, null, 2).slice(1, -1));

// Output success message
console.log(`Output written to ${outputFileName}`);
=======
import fs from 'fs';
import { format } from 'date-fns';

// Read the JSON file
const inputFileName = 'processed_output_reference_2023-12-04T133615344Z.json';
const jsonString = fs.readFileSync(inputFileName, 'utf-8');
let data = JSON.parse(jsonString);

// Define the substitutions for property values
const valueSubstitutions = {
    'BANKNIFTY': 'NSEBANK',
    'IDFCFIRSTB': 'IDFCF'
};

// Recursive function to perform substitutions for property values
const substitutePropertyValues = (obj) => {
    for (const key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            // Recursively apply substitutions for nested objects
            substitutePropertyValues(obj[key]);
        } else if (key === 'TICKER_NAME' && obj[key] in valueSubstitutions) {
            obj[key] = valueSubstitutions[obj[key]];
        }
    }
};

// Apply substitutions to property values
substitutePropertyValues(data);

// Generate timestamp in YYYY_MM_DD-HH_mm_ss format
const timestamp = format(new Date(), 'yyyy_MM_dd-HH_mm_ss');

// Define the output filename
const outputFileName = `traded_universe_${timestamp}.json`;

// Write the modified data to the output file without the outer square brackets
fs.writeFileSync(outputFileName, JSON.stringify(data, null, 2).slice(1, -1));

// Output success message
console.log(`Output written to ${outputFileName}`);
>>>>>>> adb2fa7655a144406ffa0e753eeded79799839a5
