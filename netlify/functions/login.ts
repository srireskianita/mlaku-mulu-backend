import { Handler } from "@netlify/functions";
import { connectDB } from "../../lib/db";
import Employee from "../../models/Employee";
import Tourist from "../../models/Tourist";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { response } from "../../lib/utils/response";
import { errorHandler } from "../../lib/utils/errorHandler";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return response(405, { message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { email, password } = JSON.parse(event.body || "{}");

    if (!email || !password) {
      return response(400, { message: "Email and password are required" });
    }

    let user = await Employee.findOne({ email });
    let role = "pegawai";

    if (!user) {
      user = await Tourist.findOne({ email });
      role = "turis";
    }

    if (!user) {
      return response(401, { message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response(401, { message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return response(200, {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role,
      },
    });
  } catch (error: any) {
    return errorHandler(error);
  }
};

export { handler };
