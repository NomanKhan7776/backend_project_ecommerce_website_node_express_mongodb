import bcrypt from "bcrypt";

const passwordHashing = async (password) => {
  if (!password) {
    throw new Error("password required");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error("An error occurred during password hashing");
  }
};

export default passwordHashing