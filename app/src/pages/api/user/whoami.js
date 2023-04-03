/**
 * @module api/user/whoami
 */

import { verify } from "jsonwebtoken";
import pool from "server/db";

/**
 * Fetches information about the current user.
 *
 * @function
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {string} req.method - "GET"
 * @param {string} req.headers["Content-Type"] - "application/json"
 * @param {string} req.cookies.token - The JWT token for the current user.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<Object>} A promise that resolves to a JSON object containing information about the current user, or an error message if the request is unsuccessful.
 * @throws {Error} 400 - Bad request error.
 * @throws {Error} 401 - Unauthorized error.
 * @example
 * // Example payload:
 * // {
 * //   "cookies": {
 * //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * //   }
 * // }
 *
 * fetchInfoAboutCurrentUser(req, res);
 */
async function fetchInfoAboutCurrentUser(req, res) {
  try {
    // Check request method
    if (req.method !== "GET") {
      return res.status(400).json({ message: "Invalid method." });
    }

    // Check for token cookie
    if (!req?.cookies?.token) {
      return res.status(401).json({ message: "No cookie given." });
    }

    // Verify token and get user information
    const user = verify(req.cookies.token, process.env.TOKEN_SECRET);

    if (!user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    // Get user information from the database
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE id = $1 LIMIT 1",
      [user.id]
    );

    if (!userQuery?.rows?.length) {
      return res.status(401).json({ message: "Invalid token." });
    }

    // Return user information without password
    return res.status(200).json({ ...userQuery.rows[0], password: null });
  } catch (err) {
    // Handle errors
    return res.status(400).json({ message: err.message });
  }
}

export default fetchInfoAboutCurrentUser;
