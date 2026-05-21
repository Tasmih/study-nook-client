"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client"; 

export function DeleteAlert({ room }) {
  const router = useRouter();
  const { roomName, _id } = room;

  const handleDelete = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `http://localhost:5000/room/${_id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData.token}`,
          },
        }
      );

      const data = await res.json();

      console.log(data);

      router.push("/rooms");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="danger"
        className="flex w-[170px] items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-red-700"
      >
        <FaTrash className="text-sm" />
        Delete Room
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete room permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-gray-800">
                This will permanently delete <strong>{roomName}</strong> and all of its data.
                This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Room
              </Button>
            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}