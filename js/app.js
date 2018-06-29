//get the url
const url = 'https://free.currencyconverterapi.com/api/v5/currencies'

// Call the fetch function passing the url of the API as a parameter and Transform the data into json
fetch(url) .then(response => {
    return response.json();
}).then(data => {
    console.log(data);
}).catch(err => {
    console.log("sorry....error", err)
});
