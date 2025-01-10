import jwt from "jsonwebtoken";

export const generateTokenjwt = (id: number) => {
  console.log("id", id);
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "30d" });
};
