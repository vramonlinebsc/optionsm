<<<<<<< HEAD
import fs from 'fs';
import { format } from 'date-fns';

// Read the JSON file
const inputFileName = 'gdfl_output.json'; // Replace with your input file name
const jsonString = fs.readFileSync(inputFileName, 'utf-8');
let data = JSON.parse(jsonString);

// Process the data as described in JavaScript Code 1
function parseInstrumentIdentifier(identifier) {
    // ... (rest of the code from JavaScript Code 1)
}

const updatedData = data.map((item) => {
    const instrumentIdentifier = item.INSTRUMENTIDENTIFIER;
    const additionalInfo = parseInstrumentIdentifier(instrumentIdentifier);

    if (additionalInfo) {
        // ... (rest of the code from JavaScript Code 1)
    } else {
        return item;
    }
});

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
substitutePropertyValues(updatedData);

// Get current date and time
const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, '');

// Generate filename with timestamp
const outputFilename = `processed_output_reference_${timestamp}.json`;

// Write the processed data to the output file without the outer square brackets
fs.writeFileSync(outputFilename, JSON.stringify(updatedData, null, 2).slice(1, -1));

// Output success message
console.log(`Processed data has been written to ${outputFilename}`);
=======
import fs from 'fs';
import { format } from 'date-fns';

// Read the JSON file
const inputFileName = 'gdfl_output.json'; // Replace with your input file name
const jsonString = fs.readFileSync(inputFileName, 'utf-8');
let data = JSON.parse(jsonString);

// Process the data as described in JavaScript Code 1
function parseInstrumentIdentifier(identifier) {
    // ... (rest of the code from JavaScript Code 1)
}

const updatedData = data.map((item) => {
    const instrumentIdentifier = item.INSTRUMENTIDENTIFIER;
    const additionalInfo = parseInstrumentIdentifier(instrumentIdentifier);

    if (additionalInfo) {
        // ... (rest of the code from JavaScript Code 1)
    } else {
        return item;
    }
});

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
substitutePropertyValues(updatedData);

// Get current date and time
const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, '');

// Generate filename with timestamp
const outputFilename = `processed_output_reference_${timestamp}.json`;

// Write the processed data to the output file without the outer square brackets
fs.writeFileSync(outputFilename, JSON.stringify(updatedData, null, 2).slice(1, -1));

// Output success message
console.log(`Processed data has been written to ${outputFilename}`);
>>>>>>> adb2fa7655a144406ffa0e753eeded79799839a5
