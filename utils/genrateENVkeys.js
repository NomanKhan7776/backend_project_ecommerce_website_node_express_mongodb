import crypto from "crypto";

const genrateENVkeys = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

export const sessionSecret = genrateENVkeys()
export const jwtSecret = genrateENVkeys()


