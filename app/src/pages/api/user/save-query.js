/**
 * @module api/user/save-query
 */
import pool from "server/db";
import { verify } from "jsonwebtoken";

/**
 * Saves a query.
 * @function
 * @async
 * @param {NextApiRequest} req - The HTTP request object.
 * @param {string} req.method - "POST"
 * @param {string} req.headers["Content-Type"] - "application/json"
 * @param {string} req.body.user_id - The ID of the user.
 * @param {string} req.body.query_type - The type of query. Allowed values: "hotel", "attraction".
 * @param {string} req.body.city - The city of the query.
 * @param {NextApiResponse} res - The HTTP response object.
 * @returns {Promise<Object>} A promise that resolves to a JSON object containing a JWT token, or an error message if the request is unsuccessful.
 * @throws {Error} 400 - Bad request error.
 * @throws {Error} 401 - Unauthorized error.
 * @example
 * // Example payload:
 * // {
 * //  "query_type": "hotel",
 * //  "city": "New York"
 * // }
 *
 * saveQuery(req, res);
 */
async function saveQuery(req, res) {
  if (req.method === "POST") {
    const { query_type, city } = req.body;

    const token = req.cookies.token;
    const user_id = token ? verify(token, process.env.TOKEN_SECRET).id : null;

    if (!user_id) {
      return res.status(401).json({ message: "Invalid token." });
    }

    try {
      await pool.query(
        "INSERT INTO saved_queries (user_id, query_type, city) VALUES ($1, $2, $3)",
        [user_id, query_type, city]
      );

      res.status(200).json({ message: "Query saved successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid method." });
  }
}

export default saveQuery;
