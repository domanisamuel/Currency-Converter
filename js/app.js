//get the url
const url = 'https://free.currencyconverterapi.com/api/v5/currencies'

// Call the fetch function passing the url of the API as a parameter and Transform the data into json
fetch(url) .then(response => {
    return response.json();
}).then(data => {
    // console.log(data);

    const currencyArray = Object.entries(data.results);
    let testMap = new Map();

    for(const currency of currencyArray) {
        let currencyName = currency[1].currencyName;
        let currencyId = currency[1].id;

        testMap.set(currency[1].id, currency[1].currencyName);
    }
    return testMap;

})
.then(currencyMap => {
    let select_from_currency = document.getElementById('from_currency');
    let select_to_currency = document.getElementById('to_currency');

    for(const curr of currencyMap) {
        let[id, name] = curr;

        select_from_currency.add(new Option(name, id));
        select_to_currency.add(new Option(name, id));
    }

})
.catch(err => {
    console.log("sorry....error", err)
});

//Conversion begins here lol...
const form = document.getElementById('form');

form.addEventListener('submit', event => {
    event.preventDefault();

    let from_Amount = document.getElementById('from_currency').value;
    let to_Amount = document.getElementById('to_currency').value;

    let queryUrl = 'https://free.currencyconverterapi.com/api/v5/convert?q='
    let queryString = queryUrl + from_Amount + '_' + to_Amount;

    fetch(queryString)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const queryResults = Object.entries(data.results);
        let rate = queryResults[0][1].val;
        return rate;
    })
    .then(rate => {
        let from_value = document.getElementById('from_amount').value;
        let converted_value = rate * from_value;
        document.getElementById('to_amount').value = converted_value;

    })
});