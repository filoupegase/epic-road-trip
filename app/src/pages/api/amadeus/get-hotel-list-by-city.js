/**
 * @module api/amadeus/get-hotel-list-by-city
 */

import Amadeus from "amadeus";
import fetch from "node-fetch";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY,
  clientSecret: process.env.AMADEUS_SECRET,
});

/**
 * Fetches information about hotels located in a specific city, based on the latitude and longitude coordinates of that city.
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {string} req.method - "GET"
 * @param {string} req.query.city - The name of the city for which hotel data is being requested.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<Object>} A promise that resolves to a JSON object containing information about hotels located within 25 kilometers of the latitude and longitude coordinates of the city, or an error message if the request is unsuccessful.
 * @example
 * // Example payload:
 * // ?city=CITY_NAME
 *
 * getHotelListByCity(req, res);
 */
function getHotelListByCity(req, res) {
  return new Promise(async (resolve) => {
    if (req.method !== "GET") {
      return resolve(res.status(400).json({ message: "Invalid method." }));
    }

    let latitude, longitude;
    try {
      const getCoordinates = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${req.query.city}&limit=1&appid=${process.env.OPENWEATHER_KEY}`
      ).then((res) => res.json());

      if (
        getCoordinates.length < 1 ||
        String(getCoordinates?.cod)[0] == ("4" || "5")
      ) {
        return resolve(res.status(400).json({ message: "Invalid city." }));
      }

      latitude = getCoordinates[0]?.lat;
      longitude = getCoordinates[0]?.lon;

      return amadeus.referenceData.locations.hotels.byGeocode
        .get({ latitude, longitude, radius: 25, radiusUnit: "KM" })
        .then((response) => {
          return resolve(res.status(200).json(response.data));
        })
        .catch((error) => {
          return resolve(res.status(400).json(error));
        });
    } catch (error) {
      return resolve(res.status(400).json({ message: error.message }));
    }
  });
}

export default getHotelListByCity;
