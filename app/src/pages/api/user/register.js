/**
 * @module api/user/register
 */
import { hashAndSalt } from "src/_common/components/Toolbox/server";
import pool from "server/db";
import { sign } from "jsonwebtoken";

/**
 * Registers a user.
 * @function
 * @async
 * @param {NextApiRequest} req - The HTTP request object.
 * @param {string} req.method - POST
 * @param {string} req.body.email - The email address of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {string} req.body.passwordCheck - The password of the user, for verification.
 * @param {NextApiResponse} res - The HTTP response object.
 * @returns {Promise<Object>} A promise that resolves to a JSON object containing a JWT token, or an error message if the request is unsuccessful.
 * @throws {Error} 400 - Bad request error.
 * @throws {Error} 401 - Unauthorized error.
 * @example
 * // Example payload:
 * // {
 * //   "email": "example@example.com",
 * //   "password": "password",
 * //   "passwordCheck": "password"
 * // }
 *
 * register(req, res);
 */
function register(req, res) {
  return new Promise(async (resolve) => {
    try {
      if (req.method !== "POST") {
        return resolve(res.status(400).json({ message: "Invalid method." }));
      }

      const { email, password, passwordCheck } = req.body;

      if (!email || !password || !passwordCheck) {
        return resolve(
          res.status(400).json({ message: "Not all fields have been entered." })
        );
      }

      if (password.length < 5) {
        return resolve(
          res.status(400).json({
            message: "The password needs to be at least 5 characters long.",
          })
        );
      }

      if (password !== passwordCheck) {
        return resolve(
          res.status(400).json({
            message: "Enter the same password twice for verification.",
          })
        );
      }

      const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1 LIMIT 1",
        [email]
      );

      if (existingUser?.rows?.length > 0) {
        return resolve(
          res
            .status(400)
            .json({ message: "An account with this email already exists." })
        );
      }

      const hashedPassword = hashAndSalt(password);

      const insertQuery = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, hashedPassword]
      );

      return sign(
        { id: insertQuery.rows[0].id, iss: "road_trip" },
        process.env.TOKEN_SECRET,
        (err, token) => {
          if (err) {
            return resolve(
              res.status(400).json({
                message: "Invalid token.",
              })
            );
          } else {
            return resolve(
              res
                .status(200)
                .json({ token, message: "Registration successful." })
            );
          }
        }
      );
    } catch (err) {
      return resolve(res.status(400).json({ message: err.message }));
    }
  });
}

export default register;
