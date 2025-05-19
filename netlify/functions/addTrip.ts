import { Handler } from "@netlify/functions";
import { connectDB } from "../../lib/db";
import TripModel from "../../models/Trip";
import { response } from "../../lib/utils/response";
import { errorHandler } from "../../lib/utils/errorHandler";
import { Trip } from "../functions/Trip/types";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return response(405, { message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const data: Trip = JSON.parse(event.body || "{}");

    // Validasi minimal
    if (!data.name || !data.destination || !data.price || !data.date) {
      return response(400, { message: "Missing required fields" });
    }

    const trip = await TripModel.create(data);

    return response(201, {
      message: "Trip added successfully",
      trip,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { handler };
