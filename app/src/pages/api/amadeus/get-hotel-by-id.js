/**
 * @module api/amadeus/get-hotel-by-id
 */

import Amadeus from "amadeus";
import fetch from "node-fetch";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY,
  clientSecret: process.env.AMADEUS_SECRET,
});

/**
 * Fetches information about a specific hotel, based on the hotel's ID.
 *
 * @function
 * @async
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {string} req.method - "GET"
 * @param {string} req.query.id - The ID of the hotel for which data is being requested.
 * @param {string} req.query.adults - The number of adults for the hotel search (optional, defaults to 1).
 * @param {string} req.query.checkInDate - The check-in date for the hotel search.
 * @param {string} req.query.checkOutDate - The check-out date for the hotel search.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @example
 * // Example payload:
 * // ?id=HOTEL_ID&adults=NUMBER_OF_ADULTS&checkInDate=CHECK_IN_DATE&checkOutDate=CHECK_OUT_DATE
 *
 * getHotelById(req, res);
 */
function getHotelById(req, res) {
  return new Promise(async (resolve) => {
    if (req.method !== "GET") {
      return resolve(res.status(400).json({ message: "Invalid method." }));
    }

    try {
      return amadeus.shopping.hotelOffersSearch
        .get({
          hotelIds: req.query.id,
          adults: req.query.adults || 1,
          checkInDate: req.query.checkInDate,
          checkOutDate: req.query.checkOutDate,
        })
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

export default getHotelById;
