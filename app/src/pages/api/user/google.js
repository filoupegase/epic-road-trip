/**
 * @module api/user/google
 */
import { sign } from "jsonwebtoken";
import pool from "server/db";

/**
 * Logs in a user with Google.
 * @function
 * @async
 * @param {NextApiRequest} req - The HTTP request object.
 * @param {string} req.method - "POST"
 * @param {string} req.headers["Content-Type"] - "application/json"
 * @param {string} req.body.googleTokenId - The Google token ID of the user.
 * @param {string} req.body.email - The email address of the user.
 * @param {NextApiResponse} res - The HTTP response object.
 * @returns {Promise<Object>} A promise that resolves to a JSON object containing a JWT token, or an error message if the request is unsuccessful.
 * @throws {Error} 400 - Bad request error.
 * @throws {Error} 401 - Unauthorized error.
 * @example
 * // Example payload:
 * // {
 * //   "googleTokenId": "G00G13T0K3N1D",
 * //   "email": "example@example.com"
 * // }
 * google(req, res);
 */
function google(req, res) {
  function createToken(userId) {
    return sign(
      { id: userId, iss: "road_trip" },
      process.env.TOKEN_SECRET,
      (err, token) => {
        if (err) {
          return res.status(400).json({
            message: "Invalid token",
          });
        } else {
          return res.status(200).json({ token });
        }
      }
    );
  }

  if (req.method !== "POST") {
    return res.status(400).json({ message: "Invalid method." });
  }

  if (!req.body.googleTokenId) {
    return res.status(400).json({ message: "No token provided." });
  }

  const { googleTokenId, email } = req.body;

  return new Promise(async (resolve) => {
    try {
      const user = await pool.query(
        "SELECT * FROM users WHERE email = $1 LIMIT 1",
        [email]
      );

      if (!user?.rows?.length) {
        const newUser = await pool.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
          [email, Math.random().toString(36).substring(2, 15)]
        );

        return createToken(newUser.rows[0].id);
      }

      return createToken(user.rows[0].id);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  });
}

export default google;
