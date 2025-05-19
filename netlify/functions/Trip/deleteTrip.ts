import { Handler } from "@netlify/functions";
import { connectDB } from "../../../lib/db";
import TripModel from "../../../models/Trip";
import { response } from "../../../lib/utils/response";
import { errorHandler } from "../../../lib/utils/errorHandler";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "DELETE") {
    return response(405, { message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { id } = JSON.parse(event.body || "{}");

    if (!id) {
      return response(400, { message: "Trip id is required" });
    }

    const deleted = await TripModel.findByIdAndDelete(id);

    if (!deleted) {
      return response(404, { message: "Trip not found" });
    }

    return response(200, { message: "Trip deleted successfully" });
  } catch (error) {
    return errorHandler(error);
  }
};

export { handler };
