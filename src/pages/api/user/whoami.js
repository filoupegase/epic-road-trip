import { verify } from "jsonwebtoken";
import pool from "server/db";

export default async function (req, res) {
  try {
    if (!req?.cookies?.token) {
      return res.status(401).json({ message: "No cookie given." });
    }

    const user = verify(req.cookies.token, process.env.TOKEN_SECRET);

    if (!user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    const userQuery = await pool.query(
      "SELECT * FROM users WHERE id = $1 LIMIT 1",
      [user.id]
    );

    if (!userQuery?.rows?.length) {
      return res.status(401).json({ message: "Invalid token." });
    }

    return res.status(200).json({ ...userQuery.rows[0], password: null });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
