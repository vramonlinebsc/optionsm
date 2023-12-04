import fs from 'fs';

const jsonData = JSON.parse(fs.readFileSync('gdfl_output.json', 'utf8'));

function parseInstrumentIdentifier(identifier) {
    const regex = /([A-Z]+)_(\w+)_(\d{2}[A-Z]+\d{4})_(\w{2})_(\d+(\.\d{2})?)/;
    const match = identifier.match(regex);

    if (match) {
        const [, instrument, ticker, date, nature, strike] = match;

        // Use the loaded timezone data for India/Kolkata
        const expiryDate = new Date(date);

        // Consider local time zone when determining the day of the week
        const options = { timeZone: 'Asia/Kolkata', weekday: 'long' };
        const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(expiryDate);

        const expiryType = dayOfWeek === 'Thursday' ? 'Monthly' : 'Weekly';

        return {
            INSTRUMENT: instrument,
            TICKER_NAME: ticker,
            DATE_OF_EXPIRY: date,
            DAY_OF_EXPIRY: dayOfWeek,
            EXPIRY_TYPE_OF_OPTION: expiryType,
            NATURE_OF_OPTION: nature,
            STRIKE_PRICE: parseFloat(strike), // Convert to a number
        };
    } else {
        return null;
    }
}

const updatedData = jsonData.map((item) => {
    const instrumentIdentifier = item.INSTRUMENTIDENTIFIER;
    const additionalInfo = parseInstrumentIdentifier(instrumentIdentifier);

    if (additionalInfo) {
        // Convert all keys to uppercase
        const updatedItem = Object.fromEntries(
            Object.entries(item).map(([key, value]) => [key.toUpperCase(), value])
        );

        // Calculate "BID ASK SPREAD"
        updatedItem['BID ASK SPREAD'] = Math.abs(updatedItem.BUYPRICE - updatedItem.SELLPRICE);

        // Calculate "BID ASK SPREAD AS %"
        updatedItem['BID ASK SPREAD AS %'] = ((updatedItem['BID ASK SPREAD'] / updatedItem.BUYPRICE) * 100).toFixed(2);

        // Change "Nature of option" based on "PE" or "CE"
        updatedItem.NATURE_OF_OPTION = updatedItem.NATURE_OF_OPTION === 'PE' ? 'PUT' : 'CALL';

        return { ...updatedItem, ...additionalInfo };
    } else {
        return item;
    }
});

// Get current date and time
const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, '');

// Generate filename with timestamp
const outputFilename = `processed_output_reference_${timestamp}.json`;

// Write the processed data to the output file
fs.writeFileSync(outputFilename, JSON.stringify(updatedData, null, 2));



console.log(`Processed data has been written to ${outputFilename}`);
