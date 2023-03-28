const Amadeus = require("amadeus");

const amadeus = new Amadeus({
  clientId: "xxx",
  clientSecret: "xxx",
});

const url =
  "https://api.amadeus.com/v2/shopping/hotel-offers?cityCode=PAR&adults=2&radius=5&currency=USD&priceRange=100-300";

amadeus
  .request(url)
  .then((response) => {
    // console.log(response.data);
  })
  .catch((error) => {
    // console.log(error);
  });
