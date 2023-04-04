import { verify } from "jsonwebtoken";
import pool from "server/db";

function deleteUser(req, res) {
  const token = req.cookies.token;
  return new Promise(async (resolve) => {
    try {
      if (req.method !== "DELETE") {
        return resolve(res.status(400).json({ message: "Invalid method." }));
      }

      if (!token) {
        return resolve(res.status(401).json({ message: "Unauthorized." }));
      }

      const decoded = verify(token, process.env.TOKEN_SECRET);

      if (!decoded) {
        return resolve(res.status(401).json({ message: "Unauthorized." }));
      }

      const user = await pool.query(
        "SELECT * FROM users WHERE id = $1 LIMIT 1",
        [decoded.id]
      );

      if (!user?.rows?.length) {
        return resolve(res.status(401).json({ message: "Unauthorized." }));
      }

      await pool.query("DELETE FROM users WHERE id = $1", [decoded.id]);

      return resolve(res.status(200).json({ message: "User deleted." }));
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  });
}

export default deleteUser;
