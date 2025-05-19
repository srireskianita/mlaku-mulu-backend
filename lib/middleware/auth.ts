import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mlakulaku-sangat-rahasia";

export interface AuthUser {
  id: string;
  email: string;
  role: "pegawai" | "turis";
}

export function requireAuth(event: any): { user: AuthUser } {
  const authHeader = event.headers.authorization || event.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
  return { user: decoded };
}
