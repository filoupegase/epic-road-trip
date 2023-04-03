/**
 * @module api/amadeus/get-points-of-interest
 */

import Amadeus from "amadeus";
import fetch from "node-fetch";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY,
  clientSecret: process.env.AMADEUS_SECRET,
});

/**
 * Fetches points of interest for a given city.
 *
 * @function
 * @async
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {string} req.query.city - The city for which points of interest are being requested.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @example
 * // Example payload:
 * // ?city=CITY_NAME
 *
 * getPointsOfInterest(req, res);
 */
function getPointsOfInterest(req, res) {
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

      return amadeus.referenceData.locations.pointsOfInterest
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

export default getPointsOfInterest;
