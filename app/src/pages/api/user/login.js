import { compareHash } from "src/_common/components/Toolbox/server";
import { sign } from "jsonwebtoken";
import pool from "server/db";

export default function (req, res) {
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
