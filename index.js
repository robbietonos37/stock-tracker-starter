const stockSecret = getKey();

const stockSearcherForm = document.querySelector('#stock-search-form');
const stockTickerInput = document.querySelector('#stock-ticker-input');
const companyNameDisplay = document.querySelector('#company-name');
const stockDataPrice = document.querySelector('#stock-price');


stockSearcherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const stockTickerInputValue = stockTickerInput.value;

    async function getStockData() {
        try {
            const stockDataResponse = await fetch(`https://api.stockdata.org/v1/data/quote?symbols=${stockTickerInputValue}&api_token=${stockSecret}`, { mode: 'cors' });
            const stockDataFinal = await stockDataResponse.json();
            companyNameDisplay.textContent = stockDataFinal.data[0].name;
            stockDataPrice.textContent = stockDataFinal.data[0].price;

        } catch (err) {
            console.log('Error: ' + err + ' for request')
        }

    }
    getStockData();
})
