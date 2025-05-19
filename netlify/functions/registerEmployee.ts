import bcrypt from "bcryptjs";
import { Handler } from "@netlify/functions";
import { connectDB } from "../../lib/db";
import Employee from "../../models/Employee";
import { response } from "../../lib/utils/response";
import { errorHandler } from "../../lib/utils/errorHandler";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return response(405, { message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { name, email, password } = JSON.parse(event.body || "{}");

    if (!name || !email || !password) {
      return response(400, { message: "All fields are required" });
    }

    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return response(409, { message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
    });

    await newEmployee.save();

    return response(201, { message: "Employee registered successfully" });
  } catch (error: any) {
    return errorHandler(error);
  }
};

export { handler };
