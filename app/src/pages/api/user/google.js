import { sign } from "jsonwebtoken";
import pool from "server/db";

export default function (req, res) {
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

  const { googleTokenId, email, pseudo } = req.body;

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
