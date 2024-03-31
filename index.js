// const express = require('express');
// require('dotenv').config()
// const app = express();
// const port = 4000;  // defaults to 4000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}/`);
// });

// const stockSecret = process.env.STOCK_SECRET;
const stockSecret = getStockSecret();

const stockSearcherForm = document.querySelector('#stock-search-form');
const stockTickerInput = document.querySelector('#stock-ticker-input');
const companyNameDisplay = document.querySelector('#company-name');
const stockDataPrice = document.querySelector('#stock-price');
const dayHighPrice = document.querySelector('#day-high');
const dayLowPrice = document.querySelector('#day-low');
const yearHighPrice = document.querySelector('#yearHigh');
const yearLowPrice = document.querySelector('#yearLow');
const tickerInputSection = document.querySelector('#ticker-input');


stockSearcherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const stockTickerInputValue = stockTickerInput.value;

    async function getStockData() {
        try {
            const stockDataResponse = await fetch(`https://api.stockdata.org/v1/data/quote?symbols=${stockTickerInputValue}&api_token=${stockSecret}`, { mode: 'cors' });
            const stockDataFinal = await stockDataResponse.json();
            companyNameDisplay.textContent = stockDataFinal.data[0].name;
            stockDataPrice.textContent = stockDataFinal.data[0].price;
            dayHighPrice.textContent = 'Daily High: ' + stockDataFinal.data[0].day_high;
            dayLowPrice.textContent = 'Daily Low: ' + stockDataFinal.data[0].day_low;
            yearLowPrice.textContent = 'Year Low: ' + stockDataFinal.data[0]["52_week_low"];
            yearHighPrice.textContent = 'Year Low: ' + stockDataFinal.data[0]["52_week_high"];
            console.log(stockDataFinal);

        } catch (err) {
            const invalidTickerMessage = document.createElement('p');
            tickerInputSection.appendChild(invalidTickerMessage);
            invalidTickerMessage.classList.add('wrong-ticker');
            invalidTickerMessage.textContent = 'Invalid ticker, please make sure your input is correct.'
            console.log('Error: ' + err + ' for request')
            stockTickerInput.classList.add('wrong-ticker-input');
        }

    }
    getStockData();
})
