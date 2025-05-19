import { Handler } from "@netlify/functions";
import { connectDB } from "../../lib/db";
import Tourist from "../../models/Tourist";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { response } from "../../lib/utils/response";
import { errorHandler } from "../../lib/utils/errorHandler";

const JWT_SECRET = process.env.JWT_SECRET || "mlakulaku-sangat-rahasia";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return response(405, { message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { name, email, password } = JSON.parse(event.body || "{}");

    if (!name || !email || !password) {
      return response(400, { message: "Name, email, and password are required." });
    }

    const existing = await Tourist.findOne({ email });
    if (existing) {
      return response(409, { message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const tourist = await Tourist.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: tourist._id, email: tourist.email, role: "turis" }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return response(201, {
      message: "Tourist registered successfully.",
      token,
      user: {
        id: tourist._id,
        email: tourist.email,
        name: tourist.name,
      },
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { handler };