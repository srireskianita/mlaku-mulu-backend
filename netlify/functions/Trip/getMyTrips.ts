import { Handler } from "@netlify/functions";
import { connectDB } from "../../../lib/db";
import { requireAuth } from "../../../lib/middleware/auth";
import Trip from "../../../models/Trip";
import { response } from "../../../lib/utils/response";
import { errorHandler } from "../../../lib/utils/errorHandler";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return response(405, { message: "Method Not Allowed" });
  }

  try {
    const { user } = requireAuth(event);

    if (user.role !== "turis") {
      return response(403, { message: "Forbidden: Tourist only" });
    }

    await connectDB();

    const trips = await Trip.find({ touristId: user.id }).sort({ startDate: -1 });

    return response(200, { trips });
  } catch (error: any) {
    return errorHandler(error);
  }
};

export { handler };
