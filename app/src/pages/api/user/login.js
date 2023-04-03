/**
 * @module api/user/login
 */

import { compareHash } from "src/_common/components/Toolbox/server";
import { sign } from "jsonwebtoken";
import pool from "server/db";

/**
 * Logs in a user.
 *
 * @function
 * @async
 * @param {NextApiRequest} req - The HTTP request object.
 * @param {string} req.method - POST
 * @param {string} req.body.email - The email address of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {NextApiResponse} res - The HTTP response object.
 * @returns {Promise<Object>} A promise that resolves to a JSON object containing a JWT token, or an error message if the request is unsuccessful.
 * @throws {Error} 400 - Bad request error.
 * @throws {Error} 401 - Unauthorized error.
 * @example
 * // Example payload:
 * // {
 * //   "email": "example@example.com",
 * //   "password": "password"
 * // }
 *
 * login(req, res);
 */
function login(req, res) {
  return new Promise(async (resolve) => {
    try {
      if (req.method !== "POST") {
        return resolve(res.status(400).json({ message: "Invalid method." }));
      }

      function createToken(user) {
        return sign(
          { id: user, iss: "road_trip" },
          process.env.TOKEN_SECRET,
          (err, token) => {
            if (err) {
              return resolve(
                res.status(400).json({
                  message: "Invalid token",
                })
              );
            } else {
              return resolve(res.status(200).json({ token }));
            }
          }
        );
      }

      const { email, password } = req.body;

      if (!email || !password) {
        return resolve(
          res.status(400).json({ message: "Not all fields have been entered." })
        );
      }

      const user = await pool.query(
        "SELECT * FROM users WHERE email = $1 LIMIT 1",
        [email]
      );

      if (!user?.rows?.length) {
        return resolve(
          res.status(400).json({ message: "No account with this email." })
        );
      }

      const isMatch = compareHash(password, user.rows[0].password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      return createToken(user.rows[0].id);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  });
}

export default login;
