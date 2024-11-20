const axios = require("axios");

require("dotenv").config();

const apiKey = process.env.api_key;

async function fetchAndCheckArbitrage() {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          start: 1,
          limit: 10,
          convert: "USD",
        },
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
      }
    );

    const coins = response.data.data.map((coin) => ({
      symbol: coin.symbol,
      name: coin.name,
      price: coin.quote.USD.price,
    }));

    // Check for triangular arbitrage opportunities
    for (let i = 0; i < coins.length - 2; i++) {
      for (let j = i + 1; j < coins.length - 1; j++) {
        for (let k = j + 1; k < coins.length; k++) {
          const coin1 = coins[i];
          const coin2 = coins[j];
          const coin3 = coins[k];

          const rate1 = coin1.price / coin2.price;
          const rate2 = coin2.price / coin3.price;
          const rate3 = coin3.price / coin1.price;

          if (rate1 * rate2 * rate3 > 1.01) {
            console.log(`Potential triangular arbitrage opportunity found:`);
            console.log(
              `${coin1.symbol} -> ${coin2.symbol} -> ${coin3.symbol} -> ${coin1.symbol}`
            );
          } else {
            console.log("No arbitrage opportunity found!");
          }
        }
      }
    }

    console.log("Fetched coins:", coins);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchAndCheckArbitrage();
