import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function PATCH(req, { params }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${params.id}/cancel`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      }
    );

    const data = await response.json();
    return Response.json(data);

  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}