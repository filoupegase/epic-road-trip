import bcrypt from "bcrypt";
import BinanceApiNode from "binance-api-node";

export function hashAndSalt(text) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
}

export function compareHash(text, hash) {
  return bcrypt.compareSync(text, hash);
}
