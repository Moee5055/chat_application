import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

type JWTPayload = {
  id: string;
  email: string;
};

// Create a token
export function generateToken(payload: JWTPayload) {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: "1d" });
}

// Verify a token
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET!);
}
