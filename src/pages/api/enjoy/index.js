import fetch from "node-fetch";

export default (req, res) => {
  return new Promise(async (resolve) => {
    try {
      if (req.query.location) {
        const locationId = await fetch(
          `https://api.content.tripadvisor.com/api/v1/location/search?${new URLSearchParams(
            {
              language: "en",
              key: process.env.TRIPADVISOR_KEY,
              searchQuery: req.query.location,
            }
          )}`
        )
          .then((res) => res.json())
          .then((res) => res?.data[0]?.location_id);
        if (!locationId) {
          return resolve(res.status(400).json({ message: "Invalid location" }));
        } else {
          // implement it later
          return resolve(res.json({ locationId }));
        }
      }
      if (req.query.category) {
      }
      if (req.query.startDate) {
      }
      if (req.query.endDate) {
      }
      if (req.query.query) {
      }
      if (req.query.budget) {
        const budgetMin = +req.query.budget.split("-")[0] || 0;
        const budgetMax = +req.query.budget.split("-")[1] || 0;
        if (budgetMax - budgetMin > 0) {
        } else {
          return resolve(
            res.status(400).json({ message: "Invalid budget range" })
          );
        }
      }
    } catch (err) {
      return resolve(res.status(500).json({ message: err.message }));
    }
  });
};
