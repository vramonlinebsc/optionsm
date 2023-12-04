<<<<<<< HEAD
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pLimit from 'p-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const endpoint = "https://nimblerest.lisuns.com:4532/";
const accesskey = "29cb989f-6b99-46f5-9a76-5ac3b3761ed0";

console.log("Starting script...");

async function GetLastQuoteOptionChain() {
    // Limit to 5 concurrent requests
    const limit = pLimit(30);

    let all_options = [];

    let tickers = [];
    let exp_dates = [];

    try {
        tickers = JSON.parse(fs.readFileSync(path.join(__dirname, 'list_of_options_book_tickers.json'), 'utf8'));
        exp_dates = JSON.parse(fs.readFileSync(path.join(__dirname, 'extracted_dates_list.json'), 'utf8'));

        let promises = [];

        tickers.slice(16).forEach((ticker) => {
            exp_dates.forEach((exp) => {
                promises.push(
                    limit(() => fetchOptionData(ticker, exp))
                );
            });
        });

        const results = await Promise.all(promises);
        all_options = results.flat();

        fs.writeFile('gdfl_output.json', JSON.stringify(all_options, null, 2), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });

        console.log("All promises resolved");
        console.log("Total options retrieved:", all_options.length);
    } catch (error) {
        console.error("Error reading data files:", error.message);
        console.log("No information was pulled...");
    }

    return all_options;
}

async function fetchOptionData(ticker, exp) {
    try {
        const ExchangeName = "NFO";
        const product = ticker;
        const xml = "false";
        const strMessage = `${endpoint}getlastquoteoptionchain/?accessKey=${accesskey}&exchange=${ExchangeName}&product=${product}&xml=${xml}`;

        const response = await axios.get(strMessage);

        if (response.status === 200) {
            const options_needed = response.data;

            // Check if options_needed is not null or undefined
            if (options_needed !== null && options_needed !== undefined) {
                // Check if options_needed is an array
                if (Array.isArray(options_needed)) {
                    // Filter out dictionaries with non-zero 'BUYPRICE' and 'SELLPRICE' and convert epoch time to date time format
                    const filtered_options = options_needed.reduce((acc, dict) => {
                        if (dict.BUYPRICE !== 0 && dict.SELLPRICE !== 0) {
                            dict.LASTTRADETIME = new Date(dict.LASTTRADETIME);
                            dict.SERVERTIME = new Date(dict.SERVERTIME);
                            acc.push(dict);
                        }
                        return acc;
                    }, []);

                    if (filtered_options.length > 0) {
                        console.log(`Adding ${product} ...`);
                        return filtered_options;
                    } else {
                        console.log(`Skipping ${product} because 'BUYPRICE' and/or 'SELLPRICE' are 0 in some dictionary`);
                        return [];
                    }
                } else {
                    console.log(`Error for ${product}: options_needed is not an array`);
                    return [];
                }
            } else {
                console.log(`Error for ${product}: options_needed is null or undefined`);
                return [];
            }
        } else {
            console.log(`Error for ${product}: ${response.status}`);
            return [];
        }
    } catch (error) {
        console.log(`Axios error for ${ticker} - ${exp}:`, error.message);
        return [];
    }
}



// Uncomment the line below if you want to call the function
GetLastQuoteOptionChain();
=======
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pLimit from 'p-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const endpoint = "https://nimblerest.lisuns.com:4532/";
const accesskey = "29cb989f-6b99-46f5-9a76-5ac3b3761ed0";

console.log("Starting script...");

async function GetLastQuoteOptionChain() {
    // Limit to 5 concurrent requests
    const limit = pLimit(30);

    let all_options = [];

    let tickers = [];
    let exp_dates = [];

    try {
        tickers = JSON.parse(fs.readFileSync(path.join(__dirname, 'list_of_options_book_tickers.json'), 'utf8'));
        exp_dates = JSON.parse(fs.readFileSync(path.join(__dirname, 'extracted_dates_list.json'), 'utf8'));

        let promises = [];

        tickers.slice(16).forEach((ticker) => {
            exp_dates.forEach((exp) => {
                promises.push(
                    limit(() => fetchOptionData(ticker, exp))
                );
            });
        });

        const results = await Promise.all(promises);
        all_options = results.flat();

        fs.writeFile('gdfl_output.json', JSON.stringify(all_options, null, 2), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });

        console.log("All promises resolved");
        console.log("Total options retrieved:", all_options.length);
    } catch (error) {
        console.error("Error reading data files:", error.message);
        console.log("No information was pulled...");
    }

    return all_options;
}

async function fetchOptionData(ticker, exp) {
    try {
        const ExchangeName = "NFO";
        const product = ticker;
        const xml = "false";
        const strMessage = `${endpoint}getlastquoteoptionchain/?accessKey=${accesskey}&exchange=${ExchangeName}&product=${product}&xml=${xml}`;

        const response = await axios.get(strMessage);

        if (response.status === 200) {
            const options_needed = response.data;

            // Check if options_needed is not null or undefined
            if (options_needed !== null && options_needed !== undefined) {
                // Check if options_needed is an array
                if (Array.isArray(options_needed)) {
                    // Filter out dictionaries with non-zero 'BUYPRICE' and 'SELLPRICE' and convert epoch time to date time format
                    const filtered_options = options_needed.reduce((acc, dict) => {
                        if (dict.BUYPRICE !== 0 && dict.SELLPRICE !== 0) {
                            dict.LASTTRADETIME = new Date(dict.LASTTRADETIME);
                            dict.SERVERTIME = new Date(dict.SERVERTIME);
                            acc.push(dict);
                        }
                        return acc;
                    }, []);

                    if (filtered_options.length > 0) {
                        console.log(`Adding ${product} ...`);
                        return filtered_options;
                    } else {
                        console.log(`Skipping ${product} because 'BUYPRICE' and/or 'SELLPRICE' are 0 in some dictionary`);
                        return [];
                    }
                } else {
                    console.log(`Error for ${product}: options_needed is not an array`);
                    return [];
                }
            } else {
                console.log(`Error for ${product}: options_needed is null or undefined`);
                return [];
            }
        } else {
            console.log(`Error for ${product}: ${response.status}`);
            return [];
        }
    } catch (error) {
        console.log(`Axios error for ${ticker} - ${exp}:`, error.message);
        return [];
    }
}



// Uncomment the line below if you want to call the function
GetLastQuoteOptionChain();
>>>>>>> adb2fa7655a144406ffa0e753eeded79799839a5
