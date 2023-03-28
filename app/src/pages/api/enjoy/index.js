import fetch from "node-fetch";

export default (req, res) => {
  return new Promise(async (resolve) => {
    let lat, lon;
    try {
      if (!req.query.query) {
        return resolve(res.status(400).json({ message: "Invalid query." }));
      }

      if (req.query.location) {
        const getCoordinates = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${req.query.location}&limit=1&appid=${process.env.OPENWEATHER_KEY}`
        ).then((res) => res.json());

        if (getCoordinates.length < 1) {
          return resolve(
            res.status(400).json({ message: "Invalid location." })
          );
        }

        lat = getCoordinates[0].lat;
        lon = getCoordinates[0].lon;
      }

      if (req.query.category) {
        const validCategories = [
          "hotels",
          "attractions",
          "restaurants",
          "geos",
        ];

        if (!validCategories.includes(req.query.category)) {
          return resolve(
            res.status(400).json({ message: "Invalid category." })
          );
        }
      }

      if (req.query.startDate) {
      }

      if (req.query.endDate) {
      }

      if (req.query.budget) {
        const budgetMin = +req.query.budget.split("-")[0] || 0;
        const budgetMax = +req.query.budget.split("-")[1] || 0;
        if (budgetMax - budgetMin > 0) {
        } else {
          return resolve(
            res.status(400).json({ message: "Invalid budget range." })
          );
        }
      }

      const request = await fetch(
        `https://api.content.tripadvisor.com/api/v1/location/search?${new URLSearchParams(
          {
            language: "en",
            key: process.env.TRIPADVISOR_KEY,
            searchQuery: req.query.query,
            latLong: `${lat},${lon}`,
          }
        ).toString()}`
      ).then((res) => res.json());

      return resolve(res.status(200).json(request));
    } catch (err) {
      return resolve(res.status(500).json({ message: err.message }));
    }
  });
};
