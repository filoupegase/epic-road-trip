export default (req, res) => {
  return new Promise(async (resolve) => {
    try {
      if (req.query.location) {
      }
      if (req.query.category) {
      }
      if (req.query.startDate) {
      }
      if (req.query.endDate) {
      }
      if (req.query.query) {
      }
    } catch (err) {
      return resolve(res.status(500).json({ message: err.message }));
    }
  });
};
