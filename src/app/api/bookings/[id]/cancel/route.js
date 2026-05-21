import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("your-db");

    const booking = await db.collection("bookings").findOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    });

    if (!booking) {
      return Response.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    await db.collection("bookings").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { status: "cancelled" } }
    );

    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      { $pull: { bookings: params.id } }
    );

    await db.collection("rooms").updateOne(
      { _id: new ObjectId(booking.roomId) },
      { $inc: { bookingCount: -1 } }
    );

    return Response.json({
      success: true,
      message: "Booking cancelled",
    });

  } catch (err) {
    return Response.json(
      { message: err.message },
      { status: 500 }
    );
  }
}