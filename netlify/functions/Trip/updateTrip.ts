import { Handler } from "@netlify/functions";
import { connectDB } from "../../../lib/db";
import TripModel from "../../../models/Trip";
import { response } from "../../../lib/utils/response";
import { errorHandler } from "../../../lib/utils/errorHandler";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "PUT") {
    return response(405, { message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { id, ...updateData } = JSON.parse(event.body || "{}");

    if (!id) {
      return response(400, { message: "Trip id is required" });
    }

    const updated = await TripModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return response(404, { message: "Trip not found" });
    }

    return response(200, {
      message: "Trip updated successfully",
      trip: updated,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { handler };
