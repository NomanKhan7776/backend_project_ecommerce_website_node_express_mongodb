import jwt from "jsonwebtoken";

const genrateToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET_KEY
  );
};

export default genrateToken;
